export interface EmoPicture{
       Username:String;
       Email:String;
       UrlPhotoUserSesion:String;
       UrlImage:string,
       FaceRectangle:[{ Top: Number,Left: Number,Width: Number,Height: Number}],
       Scores :Array<{ Anger: Number,Contempt: Number,Disgust: Number,Fear: Number,Happiness: Number,Neutral:
          Number,Sadness: Number,Surprise: Number}>,
       Comments:Array<{UserComment:String,Comment:String,UrlPhotoUserCOment:String}>

}
