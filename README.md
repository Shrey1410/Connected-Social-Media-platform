Project : Social Media Application (Connected)
It is a social media application where one can share its post on the application can connect with other people on that application.
Can see the post posted by the other people in their network also can Like and comment on their posts.
We follow MVC Architecture Model(Database structure), View(Routes) and Controller(internal working or function)
1. Data Models :
   
   1.1 Users : ->
   fullname : Name of user required
   username : Name also required as well as used for authentication(verifying the user).
   password : minLength 8 and used for user authentication encryption required
   emails : user email also required
   coverimage url : Cloudinary (cloud service) 
   profileimage : Cloudinary url 
   friend_requests: [ ] array
   friends: [ ] array
   friend_request_sent: [ ] array
   Online: True/False (socket programming to track user is online or offline)
   
   1.2 Posts : ->
   CreatedBy : User who creates this post
   description : Content of the Post
   likes : Array [users who liked the post]
   comments : [{usercreatedcomment, description}]
   postimage : postimage url
   
2. Controllers :
   2.1 Authentication controller : -> [login, signup, automaticlogin, logout]
   2.2 Post Controller : -> [createpost, getpostbyuser, getallpost]
   2.3 Comment Controller : -> [createcomment, getcomment]
   2.4 Like Controller : -> [togglelike]
   2.5 Profile Controller : -> [uploadthecoverimage, uploadtheprofileimage]
   2.5 Friend Controller : -> [createfriendrequest, acceptfrienrequest, getfriendsuggestions, getfriendrequests, getfriends, getpendingrequest, searchfriends]
   
