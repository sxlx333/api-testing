import express from 'express';

let weekSchedule = [
    ["Pirmadienio pirma pamoka", "Pirmadienio antra pamoka"],
    ["Antradienio pirma pamoka", "Antradienio antra pamoka"],
    ["Trečiadienio pirma pamoka", "Trečiadienio antra pamoka"],
    ["Ketvirtadienio pirma pamoka", "Ketvirtadienio antra pamoka"],
    ["Penktadienio pirma pamoka", "Penktadienio antra pamoka"],
    [], // nera pamoku
    []  
];

export const scheduleRouter = express.Router();

//GET: /api/schedule gauti visos savaites pamoku tvarkarasti
scheduleRouter.get('/', (req, res) => {
    return res.status(200).json({ schedule: weekSchedule });
});

// GET: /api/schedule/:dienos-id grazina konkrecios savaites dienos pamoku tvarkarasti pvz.: GET: /api/schedule/1

scheduleRouter.get('/:dienosId', (req, res) => {
    const dienosId = parseInt(req.params.dienosId, 10);

    if (isNaN(dienosId) || dienosId < 0 || dienosId > 6) {
        return res.status(400).json({
            status: 'error',
            msg: 'Nurodytas neteisingas dienos id. 0 = Pirmadienis, 6 = Sekmadienis.'
        });
    }

    const daySchedule = weekSchedule[dienosId];
    return res.status(200).json({ schedule: daySchedule });
});




// POST: /api/schedule - pakeisti visa savaites pamoku tvarkarasti
scheduleRouter.post('/', (req, res) => {
    const { schedule } = req.body;

    if (!Array.isArray(schedule) || schedule.length !== 7) {
        return res.status(400).json({
            status: 'error',
            msg: 'Tvarkaraštis yra savaitės, t.y 7 dienos turi būti masyvas.'
        });
    }

    for (let i = 0; i < schedule.length; i++) {
        const dayLessons = schedule[i];

        if (!Array.isArray(dayLessons)) {
            return res.status(400).json({
                status: 'error',
                msg: `Dienos pamokų sąrašas ${i + 1} turi būti masyvas.`
            });
        }

        for (const lesson of dayLessons) {
            if (typeof lesson !== 'string' || lesson.trim() === "") {
                return res.status(400).json({
                    status: 'error',
                    msg: `Dienos ${i + 1} pamokos turi būti teksto tipo ir negali būti tuščios.`
                });
            }
        }
    }

    weekSchedule = schedule;

    return res.status(201).json({
        status: 'success',
        msg: 'Tvarkaraštis sėkmingai atnaujintas',
        schedule: weekSchedule
    });
});


scheduleRouter.all('*', (req, res) => {
    return res.status(404).json({
        status: 'error',
        msg: 'nezinomybes klaida...',
    });
});
