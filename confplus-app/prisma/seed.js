
const fs = require('fs');


const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


const seed = async () => {
  
    

    try{
        const data1 = await fs.readFileSync('./data/users.json', 'utf8');
        const usersData = JSON.parse(data1);

        const data2 = await fs.readFileSync('./data/institutions.json', 'utf8');
        const institutions = JSON.parse(data2);

        const data3 = await fs.readFileSync('./data/locations.json', 'utf8');
        const locations = JSON.parse(data3);

        const data4 = await fs.readFileSync('./data/times.json', 'utf8');
        const times = JSON.parse(data4);

        const data5 = await fs.readFileSync('./data/conference-dates.json', 'utf8');
        const condates = JSON.parse(data5);

        for(let user of usersData){
            await prisma.User.create({
                data:{
                        // name: element.name,
                        // region: element.region,
                        // instructions: element.instructions,
                        // image: element.image,
                        // ingredients: element.ingredients
                       id: user.id,
                       first_name: user.first_name,
                       last_name: user.last_name,
                       email: user.email,
                       password: user.password,
                       role: user.role 
        
                    }
            })
        }

        for(let inst of institutions){
            await prisma.Institution.create({
                data:{
                    value: inst.value,
                    name: inst.name
                    }
            })
        }

        for(let loc of locations){
            await prisma.Location.create({
                data:{
                    value: loc.value,
                    name: loc.name
                    }
            })
        }

        for(let t of times){
            await prisma.Time.create({
                data:{
                    time: t.time
                    }
            })
        }
        
        for(let d of condates){
            await prisma.condates.create({
                data:{
                    date: d.date
                    }
            })
        }
       



        console.log("seeding completed.")
    }catch(error){
        console.error(error);
    }
    
}

seed()
.then(async () => await prisma.$disconnect())
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});