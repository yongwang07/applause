1. cd server
2. npm install (in server folder)
3. swagger project start (in server folder)

4. cd client
5. npm install (in client folder)
6. ng server --open (in client folder, open browser automatically)


Assignment built on Angular2 + Node
using two tool:
Angular2 CLI tool to create front end skeleton 
Swagger to create backend server skeleton

Basic Ideal:
1. read through all CSV file to build a column base in-momory DB.

            country1(GB)        country2(US)       country3(JP)          All(*)

deviceId1    userId1->bug        userId9->bug                         userId1->bug
             userId2->bug                                             userId2->bug
                                                                      userId9->bug

deviceId2    userId2->bug       
             userId5->bug


All(*)       userId1->bug       userId9->bug                         userId1->bug  
             userId2->bug                                            userId2->bug
             userId5->bug                                            userId5->bug
                                                                     userId9->bug


2. fly on time search.
   collect all corresponding cell, aggregate (tester -> bug) info.
   i.e. [US, JP] + [deviceId1 + deviceId2]
   aggrate  [userId1->bug, userId2->bug, userId9->bug, userId2->bug, userId5->bug]
   