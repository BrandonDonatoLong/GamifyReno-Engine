# GamifyReno-Engine
Backend engine for GamifyReno project for the Reno Hackathon 2017

Backend will be developed in stages. The first stage is to create a list of objectives and then when a user accomplishes
the objective tie it to them.

I am thinking a RESTFUL API

### Post: Objective
    {
        ObjectiveTitle: "Title",
        ObjectiveDescription: "Title",
        PointValue: Number,
        Location: {lat: Number, Long: Number}
    }

### Get: Objective
    {
        list of objective objects
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

###Post: RateAccomplishment
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
    
###Team

####Post CreateTeam
    {
        TeamName: TeamName,
        TeamCreator: UserID,
        TeamMoto: String,
        OpenToCreate: True | False
    }
    
####Get Teams
    {
        Team
    }