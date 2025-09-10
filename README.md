# 🌐 Social Media Application (Connected)

This is a **Social Media Application** where users can:  
- Share posts with text and images.  
- Connect with other people (friend requests).  
- See posts shared by their network.  
- Like and comment on posts.  
- Track online/offline status of friends (via socket programming).  

The project follows **MVC Architecture**:  
- **Model** → Database structure  
- **View** → Routes  
- **Controller** → Internal working / functions  

---

## 📂 Data Models  

### 1.1 User Model  
```json
{
  "fullName": "string (required)",
  "username": "string (required, unique, used for authentication)",
  "password": "string (minLength: 8, encrypted)",
  "email": "string (required, unique)",
  "coverImage": "string (Cloudinary URL)",
  "profileImage": "string (Cloudinary URL)",
  "friend_requests": ["UserIds"],
  "friends": ["UserIds"],
  "friend_request_sent": ["UserIds"],
  "online": "boolean (true/false)"
}
```
### 1.2 Post Model
```json
{
  "createdBy": "UserId",
  "description": "string (post content)",
  "likes": ["UserIds"],
  "comments": [
    {
      "userCreatedComment": "UserId",
      "description": "string"
    }
  ],
  "postImage": "string (Cloudinary URL)"
}
```

## Controllers
2.1 Authentication Controller

2.1.1 login

2.1.2 signup

2.1.3 automaticLogin

2.1.4 logout

2.2 Post Controller

2.2.1 createPost

2.2.2 getPostByUser

2.2.3 getAllPost

2.3 Comment Controller

2.3.1 createComment

2.3.2 getComment

2.4 Like Controller

2.4.1 toggleLike

2.5 Profile Controller

2.5.1 uploadTheCoverImage

2.5.2 uploadTheProfileImage

2.6 Friend Controller

2.6.1 createFriendRequest

2.6.2 acceptFriendRequest

2.6.3 getFriendSuggestions

2.6.4 getFriendRequests

2.6.5 getFriends

2.6.6 getPendingRequest

2.6.7 searchFriends
