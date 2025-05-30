const { Server } = require('socket.io');
const user_model = require('./models/user.model');
const map = new Map()
const FRONTEND_URL = process.env.FRONTEND_URL || "https://connected-social-media-platform-nmh.vercel.app"
function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: `${FRONTEND_URL}`,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);
        socket.on('join', async (data) => {
            console.log('User joined:', data);
            let user = await user_model.findByIdAndUpdate(data.user, { Online: true }, { new: true })
            map.set(socket.id, user._id)
            user = {
                id: user._id,
                fullname: user.fullname,
                username: user.username,
                profile_image: user.profile_image,
                Online: user.Online
            }
            console.log('User updated:', user);
            socket.emit('userupdated', user);
        });
        socket.on('disconnect', async () => {
            console.log('User disconnected', socket.id);
            const user_id = map.get(socket.id)
            if(user_id){
            map.delete(socket.id)
            const user = await user_model.findByIdAndUpdate(user_id, {
                Online : false
            },{new : true})
            console.log(user)
        }
        });
        socket.on('leave', async (data)=>{
            if(data.user){
            map.delete(socket.id)
            const user = await user_model.findByIdAndUpdate(data.user, {
                Online : false
            },{new : true})
            console.log(user)
        }
        });
    });
    return io;
}
module.exports = initializeSocket;