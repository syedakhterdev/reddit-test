const UserModel = require('./models/UserModel')
const PostModel = require('./models/PostModel')
const UserSubRedditModel = require('./models/UserSubRedditModel')

const cron = require('node-cron')

module.exports = {
    scheduleNotificationsForTime :  async ( time ) => {
        // Getting users based on notification time 
        let users = await UserModel.find({ notificationTime: time })
        let userEmailData = []
        if (users && users.length) {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.notification) {
                    userEmailData[i] = { 
                        email : user.email ? user.email : null,
                        name: user.name ? user.name : 'anonymous'
                    }
                    // Getting user's subreddits
                    let userSubReddits =  await UserSubRedditModel.find({ userId: user._id }).populate('subRedditId')
                    let usrSbRd = []
                    if ( userSubReddits && userSubReddits.length ) {
                    for (let k = 0; k < userSubReddits.length; k++) {
                        const userSubReddit = userSubReddits[k];

                        usrSbRd[k] = {
                            name: userSubReddit.subRedditId.name,
                            description: userSubReddit.subRedditId.description,
                        }
                        // Getting subreddit's 3 most voted posts
                        let posts =  await PostModel.find({ subRedditId: userSubReddit.subRedditId._id })
                                                        .sort('-votes')
                                                        .limit(3)
                        if (posts && posts.length ) {
                            // Posts found!
                            usrSbRd[k] = { ...usrSbRd[k], posts: posts }
                        } else {
                            console.log('No posts found for subreddit ', userSubReddit.subRedditId._id);
                            usrSbRd[k] = { ...usrSbRd[k], posts: [] }
                        }
    
                    }
                        userEmailData[i] = { ...userEmailData[i], userSubReddits: usrSbRd }
                    } else {
                    console.log('No subreddit found for ', user._id);
                        userEmailData[i] = { ...userEmailData[i], userSubReddits: [] }
                    }   
                } else {
                    console.log('Notifications turned off for ', user._id);
                }
            }
        } else {
            console.log('No user found');
        }
        // 
        console.log("Notification Data for All users: ", userEmailData);
    },
    // This function will schedule all the jobs on their time
    sendNotifications: async () => {
    let times = await UserModel.distinct('notificationTime')
        for (let i = 0; i < times.length; i++) {
            const time = times[i];
            cron.schedule(`0 ${time} * * *`, () => {
                scheduleNotificationsForTime(time)
            })
            console.log('Scheduled for: ', time);
        }

    }

}