import express from 'express';
import userObject from './user.js';
import travelObject from './diary.js';

const app = express();

// User routes
app.post("/register/", (request, response) => {
  userObject.registerUser(request, response);
});

app.post("/login/", (request, response) => {
  userObject.loginUser(request, response);
});

app.put("/login/:emailId/", userObject.authenticateToken, (request, response) => {
  userObject.updateProfileDetails(request, response);
});

app.delete("/login/:emailId/", userObject.authenticateToken, (request, response) => {
  userObject.deleteUserProfile(request, response);
});

// Travel diary routes
app.post("/travel/", userObject.authenticateToken, (request, response) => {
  travelObject.postTravelDiary(request, response);
});

app.get("/travel/", userObject.authenticateToken, (request, response) => {
  travelObject.getAllTravelDiaries(request, response);
});

app.get("/travel/:travelId/", userObject.authenticateToken, (request, response) => {
  travelObject.getTravelDiary(request, response);
});

app.put("/travel/:travelId/", userObject.authenticateToken, (request, response) => {
  travelObject.updateTravelDiary(request, response);
});

app.delete("/travel/:travelId/", userObject.authenticateToken, (request, response) => {
  travelObject.deleteTravelDiary(request, response);
});

export default app;
