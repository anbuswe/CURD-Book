import db from './db.js';

class DiaryEntry {
    async postTravelDiary(request, response) {
        const travelDiaryDetails = request.body;
        const { id, title, description, date, location } = travelDiaryDetails;
    
        const addTravelDiaryQuery = `INSERT INTO traveldiary
                (id,title,description,date,location)
            VAlUES 
                (${id},'${title}','${description}','${date}','${location}')`;
    
        await db.run(addTravelDiaryQuery);
        response.send("Travel Diary Entry Added Successfully");
    }
}

const travelObject = new DiaryEntry();
export default travelObject;
