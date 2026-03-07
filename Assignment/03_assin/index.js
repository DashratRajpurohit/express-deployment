const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const states = [
  { id: 1, name: "Andhra Pradesh", population: 49386799, literacyRate: 67.02, annualBudget: 279279, gdp: 14000000 },
  { id: 2, name: "Arunachal Pradesh", population: 1383727, literacyRate: 65.38, annualBudget: 28000, gdp: 300000 },
  { id: 3, name: "Assam", population: 31205576, literacyRate: 72.19, annualBudget: 122000, gdp: 4500000 },
  { id: 4, name: "Bihar", population: 104099452, literacyRate: 61.80, annualBudget: 261885, gdp: 6500000 },
  { id: 5, name: "Chhattisgarh", population: 25545198, literacyRate: 70.28, annualBudget: 121500, gdp: 4000000 },
  { id: 6, name: "Goa", population: 1458545, literacyRate: 88.70, annualBudget: 25000, gdp: 800000 },
  { id: 7, name: "Gujarat", population: 63872399, literacyRate: 78.03, annualBudget: 243965, gdp: 21000000 },
  { id: 8, name: "Haryana", population: 25351462, literacyRate: 75.55, annualBudget: 180000, gdp: 9000000 },
  { id: 9, name: "Himachal Pradesh", population: 6864602, literacyRate: 82.80, annualBudget: 50000, gdp: 2000000 },
  { id: 10, name: "Jharkhand", population: 32988134, literacyRate: 66.41, annualBudget: 110000, gdp: 4500000 },
  { id: 11, name: "Karnataka", population: 61095297, literacyRate: 75.36, annualBudget: 275000, gdp: 18000000 },
  { id: 12, name: "Kerala", population: 33406061, literacyRate: 94.00, annualBudget: 150000, gdp: 12000000 },
  { id: 13, name: "Madhya Pradesh", population: 72626809, literacyRate: 69.32, annualBudget: 240000, gdp: 10000000 },
  { id: 14, name: "Maharashtra", population: 112374333, literacyRate: 82.34, annualBudget: 340000, gdp: 35000000 },
  { id: 15, name: "Manipur", population: 2855794, literacyRate: 79.85, annualBudget: 32000, gdp: 600000 },
  { id: 16, name: "Meghalaya", population: 2966889, literacyRate: 75.48, annualBudget: 30000, gdp: 500000 },
  { id: 17, name: "Mizoram", population: 1097206, literacyRate: 91.33, annualBudget: 25000, gdp: 400000 },
  { id: 18, name: "Nagaland", population: 1978502, literacyRate: 79.55, annualBudget: 27000, gdp: 500000 },
  { id: 19, name: "Odisha", population: 41974218, literacyRate: 72.87, annualBudget: 200000, gdp: 8000000 },
  { id: 20, name: "Punjab", population: 27743338, literacyRate: 75.84, annualBudget: 180000, gdp: 11000000 },
  { id: 21, name: "Rajasthan", population: 68548437, literacyRate: 66.11, annualBudget: 225000, gdp: 14000000 },
  { id: 22, name: "Sikkim", population: 610577, literacyRate: 81.42, annualBudget: 15000, gdp: 200000 },
  { id: 23, name: "Tamil Nadu", population: 72147030, literacyRate: 80.09, annualBudget: 300000, gdp: 22000000 },
  { id: 24, name: "Telangana", population: 35003674, literacyRate: 72.80, annualBudget: 290000, gdp: 15000000 },
  { id: 25, name: "Tripura", population: 3673917, literacyRate: 87.22, annualBudget: 25000, gdp: 700000 },
  { id: 26, name: "Uttar Pradesh", population: 199812341, literacyRate: 67.68, annualBudget: 350000, gdp: 25000000 },
  { id: 27, name: "Uttarakhand", population: 10086292, literacyRate: 78.82, annualBudget: 60000, gdp: 3000000 },
  { id: 28, name: "West Bengal", population: 91276115, literacyRate: 76.26, annualBudget: 310000, gdp: 16000000 }
];


app.get("/states",(req,res) => {
    res.status(200).json(states);
});

app.get("/states/highestgdp/",(req,res) => {
    
    let max =0;
    for(let i=0; i<states.length;i++){
        if(states[i].gdp>max)max = states[i].gdp;
    }
    console.log(max);
    
    if(max === 0){
        return res.status(404).json({message:"Stats GDP not found"});
    }
    res.status(200).json({
          MaximunGDP:`${max}`
    });
});




app.get("/states/:id",(req,res) => {
    const statesID = Number(req.params.id);
    const state = states.find(u => u.id === statesID);

    if (!state) {
    return res.status(404).json({ message: "State not found" });
  }

    res.status(200).json(state);
});

app.post("/states",(req,res) => {
    const newSt = {
        id:states.length+1,
        name:req.body.name,
        population:req.body.population,
        literacyRate:req.body.literacyRate,
        annualBudget:req.body.annualBudget,
        gdp:req.body.gdp
    };

    states.push(newSt);

    res.status(201).json({
        massage:"New State Added",
        state:newSt
    });

});

app.put("/states/:id",(req,res) => {
    const stateID = Number(req.params.id);
    const index = states.find(u => u.id === stateID);
    console.log(stateID);
    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    states[index] = {
        id:stateID,
        name:req.body.name,
        population:req.body.population,
        literacyRate:req.body.literacyRate,
        annualBudget:req.body.annualBudget,
        gdp:req.body.gdp
    };

    res.status(200).json({
        massage: "State Data replaced",
        products: states[index]
    });

});

app.put("/states/:id/budget",(req,res) => {
    const stateID = Number(req.params.id);
    const state = states.findIndex(u => u.id === stateID);
    console.log(stateID);
    if (state === -1) {
        return res.status(404).json({ message: "State not found" });
    }

        states[state] = {
        id:stateID,
        name:states[state].name,
        population:states[state].population,
        literacyRate:states[state].literacyRate,
        annualBudget:req.body.annualBudget,
        gdp:states[state].gdp
        };

    res.status(200).json({
        massage: "State AnnualBudget update",
        states: states[state]
    });

});

app.put("/states/:id/population",(req,res) => {
    const stateID = Number(req.params.id);
    const state = states.findIndex(u => u.id === stateID);
    console.log(stateID);
    if (state===-1) {
        return res.status(404).json({ message: "State not found" });
    }

        states[state] = {
        id:stateID,
        name:states[state].name,
        population:req.body.population,
        literacyRate:states[state].literacyRate,
        annualBudget:states[state].annualBudget,
        gdp:states[state].gdp
        };

    res.status(200).json({
        massage: "State Population update",
        states: states[state]
    });

});

app.patch("/states/:id/literacy",(req,res) => {
    const stateID = Number(req.params.id);
    const state = states.find(u => u.id === stateID);
    console.log(stateID);
    if (!stateID) {
        return res.status(404).json({ message: "State not found" });
    }

    if(req.body.literacyRate)state.literacyRate = req.body.literacyRate;

    res.status(200).json({
        massage: "states LiteracyRate update",
        states: state 
    });

});




app.patch("/states/:id/gdp",(req,res) => {
    const stateID = Number(req.params.id);
    const state = states.find(u => u.id === stateID);
    console.log(req.body);
    if (!stateID) {
        return res.status(404).json({ message: "State not found" });
    }

    if(req.body.gdp)state.gdp = req.body.gdp;

    res.status(200).json({
        massage: "states GDP update",
        states: state
    });

});




app.patch("/states/:id",(req,res) => {
    const stateID = Number(req.params.id);
    const state = states.find(u => u.id === stateID);
    console.log(req.body);
    if (!stateID) {
        return res.status(404).json({ message: "State not found" });
    }

    if(req.body.gdp)state.gdp = req.body.gdp;

    res.status(200).json({
        massage: "states GDP update",
        states: state
    });

});

app.delete("/states/:id",(req,res) => {
    const ststeId = Number(req.params.id);
    const state = states.findIndex( u => u.id === ststeId);
    if(state === -1){
        return res.status(404).json({massage:"state not found"});
    }
    states.slice(state,1);
    res.status(200).json({
        massage:"State Deleted Secessfully"
    })
})



app.listen(3000, () =>{
    console.log("Server started on port 3000");
});
