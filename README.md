# GamifyReno-Engine
Backend engine for GamifyReno project for the Reno Hackathon 2017

Backend will be developed in stages. The first stage is to create a list of objectives and then when a user accomplishes
the objective tie it to them.

All of the bodies are encoded in x-www-form-urlencoded 

## Objectives
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

### Post: Accomplishment
    {
        ObjectiveID: number
        UserID: String
        Proof: Object
    }

### Get: Accomplishment
    {
        AccomplishmentID: Number
        ObjectiveID: Number
        UserID: String
        Rating: Number
    }

### Post: RateAccomplishment
    {
        AccomplishmentID: Number
        Rating: 1-5
        UserID: String
    }

### User 
    {
        UserID: String,
        TeamID: String,
        Password: String,
        Accomplishments: [list of accomplishments by user for user profile]
    }
    
### Team

#### Post CreateTeam
    {
        TeamName: TeamName,
        TeamCreator: UserID,
        TeamMoto: String,
        OpenToCreate: True | False
    }
    
#### Get Teams
    {
        Team
    }