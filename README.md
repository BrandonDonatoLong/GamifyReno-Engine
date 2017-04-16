# GamifyReno-Engine
Backend engine for GamifyReno project for the Reno Hackathon 2017

Backend will be developed in stages. The first stage is to create a list of objectives and then when a user accomplishes
the objective tie it to them.

All of the bodies are encoded in x-www-form-urlencoded 

## Objectives
### Get: Objectives

Gets list of all Objectives, no filters

/api/Objectives

#### Return:
    
    [
      {
        "id": 0,
        "title": "Complete a 24 hour Hack-a-thon",
        "description": "Compete a hackathon. Might I Suggest NASA Space Apps on April 29-30, 2017.",
        "basePoints": 1000,
        "usersCompleted": [
          {
            "AccomplishmentID": 0,
            "userID": "BrandonDonLong"
          },
          {
            "AccomplishmentID": 1,
            "userID": "user2"
          }
        ],
        "completedBefore": false,
        "location": {
          "lat": 39.525451,
          "long": -119.816723
        }
      },
      {
        "id": 1,
        "title": "Complete a Second Hackathon",
        "description": "Compete a hackathon. Might I Suggest NASA Space Apps on April 29-30, 2017.",
        "basePoints": 1000,
        "usersCompleted": [],
        "completedBefore": false,
        "location": {
          "lat": 39.543308,
          "long": -119.81569
        }
      }
    ]

### Get: ObjectiveById
    
/api/ObjectiveById?id=0

#### Return:
    
    {
      "id": 0,
      "title": "Complete a 24 hour Hack-a-thon",
      "description": "Compete a hackathon. Might I Suggest NASA Space Apps on April 29-30, 2017.",
      "basePoints": 1000,
      "usersCompleted": [
        {
          "AccomplishmentID": 0,
          "userID": "BrandonDonLong"
        },
        {
          "AccomplishmentID": 1,
          "userID": "user2"
        }
      ],
      "completedBefore": false,
      "location": {
        "lat": 39.525451,
        "long": -119.816723
      }
    }
### Get: ObjectiveByLocation
   
/api/ObjectiveByLocation?lat=39.543308&long=-119.81569

#### Return:

    [
      {
        "id": 0,
        "title": "Complete a 24 hour Hack-a-thon",
        "description": "Compete a hackathon. Might I Suggest NASA Space Apps on April 29-30, 2017.",
        "basePoints": 1000,
        "usersCompleted": [
          {
            "AccomplishmentID": 0,
            "userID": "BrandonDonLong"
          },
          {
            "AccomplishmentID": 1,
            "userID": "user2"
          }
        ],
        "completedBefore": false,
        "location": {
          "lat": 39.525451,
          "long": -119.816723
        }
      },
      {
        "id": 1,
        "title": "Complete a Second Hackathon",
        "description": "Compete a hackathon. Might I Suggest NASA Space Apps on April 29-30, 2017.",
        "basePoints": 1000,
        "usersCompleted": [],
        "completedBefore": false,
        "location": {
          "lat": 39.543308,
          "long": -119.81569
        }
      }
    ]
    
### Post: PostObjective

/api/PostObjective

    title:Complete a Second Hackathon
    description:Compete a hackathon. Might I Suggest NASA Space Apps on April 29-30, 2017.
    lat:39.543308
    long:-119.815690
    points:1000
    
#### Return:

    {
      "id": 1,
      "title": "Complete a Second Hackathon",
      "description": "Compete a hackathon. Might I Suggest NASA Space Apps on April 29-30, 2017.",
      "basePoints": 1000,
      "usersCompleted": [],
      "completedBefore": false,
      "location": {
        "lat": 39.543308,
        "long": -119.81569
      }
    }
    
### Post: CompleteObjective

/api/CompleteObjective

    id:0
    userId:user2
    proof:http://imgur.com
    
#### Return:

    {
      "accomplishment": {
        "objectiveID": 0,
        "accomplishmentID": 1,
        "userID": "user2",
        "proof": "http://imgur.com",
        "userRatings": [],
        "points": 0,
        "timestamp": 1492352977507
      },
      "objective": {
        "id": 0,
        "title": "Complete a 24 hour Hack-a-thon",
        "description": "Compete a hackathon. Might I Suggest NASA Space Apps on April 29-30, 2017.",
        "basePoints": 1000,
        "usersCompleted": [
          {
            "AccomplishmentID": 0,
            "userID": "BrandonDonLong"
          },
          {
            "AccomplishmentID": 1,
            "userID": "user2"
          }
        ],
        "completedBefore": false,
        "location": {
          "lat": 39.525451,
          "long": -119.816723
        }
      },
      "user": {
        "userID": "user2",
        "password": "password",
        "teamID": null,
        "userRating": 1010
      }
    }
    
## Users

### Get: Users

/api/Users

#### Return:

    [
      {
        "userID": "BrandonDonLong",
        "password": "Abc123",
        "teamID": "Goons",
        "userRating": 1035,
        "userPicture": "http://i.imgur.com/g1oNYop.jpg"
      },
      {
        "userID": "user2",
        "password": "password",
        "teamID": null,
        "userRating": 1010
      }
    ]

### Get: userByID

/api/userByID?id=user2

#### Return:

    {
      "userID": "user2",
      "password": "password",
      "teamID": null,
      "userRating": 1010
    }
    
### Post: createUser

/api/createUser

    userID:user3
    password:password
optional

    profilePhoto:http://imgur.com/
    teamID:Goons

#### Returns:

    {
      "userID": "user3",
      "password": "password",
      "teamID": "Goons",
      "userRating": 20,
      "userPicture": "http://imgur.com/"
    }
    
## Accomplishments

### Get: Accomplishments

/api/Accomplishments

#### Returns:

    [
      {
        "objectiveID": 0,
        "accomplishmentID": 0,
        "userID": "user2",
        "proof": "http://imgur.com",
        "userRatings": [],
        "points": 0,
        "timestamp": 1492356450999
      },
      {
        "objectiveID": 0,
        "accomplishmentID": 1,
        "userID": "BrandonDonLong",
        "proof": "http://imgur.com",
        "userRatings": [],
        "points": 0,
        "timestamp": 1492356463999
      }
    ]
    
### Get: AccomplishmentByUser

/api/AccomplishmentByUser?userID=user2
    
#### Return:

    [
      {
        "objectiveID": 0,
        "accomplishmentID": 0,
        "userID": "user2",
        "proof": "http://imgur.com",
        "userRatings": [],
        "points": 0,
        "timestamp": 1492356450999
      }
    ]
    
### Get: AccomplishmentByUser

/api/AccomplishmentByObjective?objectiveID=0
    
#### Return:

    [
      {
        "objectiveID": 0,
        "accomplishmentID": 0,
        "userID": "user2",
        "proof": "http://imgur.com",
        "userRatings": [],
        "points": 0,
        "timestamp": 1492356450999
      },
      {
        "objectiveID": 0,
        "accomplishmentID": 1,
        "userID": "BrandonDonLong",
        "proof": "http://imgur.com",
        "userRatings": [],
        "points": 0,
        "timestamp": 1492356463999
      }
    ]
    
## Rating System

Most of the rating system is around people rating items and those items all have 
different ways of getting to them.

### Post: Rating

/api/Rating

    id:0
    userID:user3
    rating:2
    
#### Return:

    {
      "Accomplishment": {
        "objectiveID": 0,
        "accomplishmentID": 0,
        "userID": "BrandonDonLong",
        "proof": "http://imgur.com",
        "userRatings": [
          {
            "user": "user2",
            "rating": 5
          },
          {
            "user": "user3",
            "rating": 2
          }
        ],
        "points": 7,
        "timestamp": 1492352870134
      },
      "user": {
        "userID": "BrandonDonLong",
        "password": "Abc123",
        "teamID": "Goons",
        "userRating": 1037,
        "userPicture": "http://i.imgur.com/g1oNYop.jpg"
      }
    }