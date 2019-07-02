import { FormValidations } from '../registry.model';

export const validations: FormValidations = {
         sectionA: {
           HN: [{ type: 'required', message: 'HN is required' }],
           AN: [{ type: 'required', message: 'AN is needed' }]
         },
         sectionB: {
           PatLName: [
             { type: 'minlength', message: 'Patient Last Name must be at least 5' },
             { type: 'maxlength', message: 'Patient Last Name cannot be more than 10' }
           ]
         },
         sectionD: {
           HeightCM: [
             { type: 'min', message: 'Height must be at least 20 cm' },
             { type: 'max', message: 'Height cannot be more than 251 cm' }
           ],
           WeightKg: [
             { type: 'min', message: 'Weight must be at least 10 kg' },
             { type: 'max', message: 'Weight cannot be more than 250 kg' }
           ],
           FEV1: [
             { type: 'min', message: 'FEV1 must be at least 10 %' },
             { type: 'max', message: 'FEV1 cannot be more than 200 %' }
           ],
           DLCOPred: [
             { type: 'min', message: 'DLCOPred must be at least 10 %' },
             { type: 'max', message: 'DLCOPred cannot be more than 200 %' }
           ],
           PCO2: [
             { type: 'min', message: 'PCO2 must be at least 20' },
             { type: 'max', message: 'PCO2 cannot be more than 120' }
           ],
           PO2: [
             { type: 'min', message: 'PO2 must be at least 40' },
             { type: 'max', message: 'PO2 cannot be more than 500' }
           ],
           WBC: [
             { type: 'min', message: 'WBC Count must be at least 100' },
             { type: 'max', message: 'WBC Count cannot be more than 99,990' }
           ],
           RFHemoglobin: [
             { type: 'min', message: 'Hemoglobin must be at least 1.0' },
             { type: 'max', message: 'Hemoglobin cannot be more than 50.0' }
           ],
           Hct: [
             { type: 'min', message: 'Hematocrit must be at least 1.0' },
             { type: 'max', message: 'Hematocrit cannot be more than 99.99' }
           ],
           Platelets: [
             { type: 'min', message: 'Platelet Count must be at least 1000' },
             { type: 'max', message: 'Platelet Count cannot be more than 900,000' }
           ],
           CreatLst: [
             { type: 'min', message: 'Last Creatinine Level must be at least 0.1' },
             { type: 'max', message: 'Last Creatinine Level cannot be more than 30.0' }
           ],
           TotAlbumin: [
             { type: 'min', message: 'Total Albumin must be at least 1.0' },
             { type: 'max', message: 'Total Albumin cannot be more than 10.0' }
           ],
           TotBlrbn: [
             { type: 'min', message: 'Total Bilirubin must be at least 0.1' },
             { type: 'max', message: 'Total Bilirubin cannot be more than 50.0' }
           ],
           A1cLvl: [
             { type: 'min', message: 'A1c Level must be at least 1.0' },
             { type: 'max', message: 'A1c Level cannot be more than 20.0' }
           ],
           INR: [
             { type: 'min', message: 'INR must be at least 0.5' },
             { type: 'max', message: 'INR cannot be more than 30.0' }
           ],
           MELDScr: [
             { type: 'min', message: 'MELD Score must be at least -50' },
             { type: 'max', message: 'MELD Score cannot be more than 150' }
           ],
           BNP: [
             { type: 'min', message: 'BNP must be at least 5' },
             { type: 'max', message: 'BNP cannot be more than 70,000' }
           ],
           SixMWalkDist: [
             { type: 'min', message: 'Total Distance must be at least 1' },
             { type: 'max', message: 'Total Distance cannot be more than 3,000' }
           ]
         },
         sectionE: {
           PrCVInt: [{ type: 'required', message: 'Required' }]
         },
         sectionF: {},
         sectionG: {},
         sectionH: {
           // cath finding
           PctStenLMain: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRLMain: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRLMain: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenProxLAD: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRProxLAD: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRProxLAD: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenMidLAD: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRMidLAD: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRMidLAD: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenDistLAD: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRDistLAD: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRDistLAD: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenDiag1: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRDiag1: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRDiag1: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenDiag2: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRDiag2: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRDiag2: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenDiag3: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRDiag3: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRDiag3: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenCircflx: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRCircflx: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRCircflx: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenOM1: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFROM1: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFROM1: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenOM2: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFROM2: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFROM2: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenOM3: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFROM3: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFROM3: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenRamus: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRRamus: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRRamus: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenRCA: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRRCA: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRRCA: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenAM: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRAM: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRAM: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenPDA: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRPDA: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRPDA: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           PctStenPLB: [
             { type: 'min', message: '% Stenosis must be at least 0' },
             { type: 'max', message: '% Stenosis cannot be more than 100' }
           ],
           FFRPLB: [
             { type: 'min', message: 'FFR must be at least 0.00' },
             { type: 'max', message: 'FFR cannot be more than 1.00' }
           ],
           IFRPLB: [
             { type: 'min', message: 'iFR must be at least 0.00' },
             { type: 'max', message: 'iFR cannot be more than 1.00' }
           ],

           SyntaxScr: [
             { type: 'min', message: 'Syntax Score must be at least 0' },
             { type: 'max', message: 'Syntax Score cannot be more than 100' }
           ],
           HDEF: [
             { type: 'min', message: 'Ejection Fraction must be at least 1' },
             { type: 'max', message: 'Ejection Fraction cannot be more than 99' }
           ],
           LVSD: [
             { type: 'min', message: 'LVSD must be at least 0.0' },
             { type: 'max', message: 'LVSD cannot be more than 99.0' }
           ],
           LVEDD: [
             { type: 'min', message: 'LVEDD must be at least 20.0' },
             { type: 'max', message: 'LVEDD cannot be more than 100.0' }
           ],
           PASYS: [
             { type: 'min', message: 'PA Systolic Pressure must be at least 10' },
             { type: 'max', message: 'PA Systolic Pressure cannot be more than 150' }
           ],
           VDAoVA: [
             { type: 'min', message: 'Smallest Aortic Valve Area must be at least 0.2' },
             { type: 'max', message: 'Smallest Aortic Valve Area cannot be more than 5.0' }
           ],
           VDGradA: [
             { type: 'min', message: 'Highest Mean Gradient must be at least 0' },
             { type: 'max', message: 'Highest Mean Gradient cannot be more than 200' }
           ],
           VDVMax: [
             { type: 'min', message: 'Maximum Aortic jet velocity must be at least 0' },
             { type: 'max', message: 'Maximum Aortic jet velocity cannot be more than 8' }
           ],
           VDMVA: [
             { type: 'min', message: 'Smallest Valve Area must be at least 0.6' },
             { type: 'max', message: 'Smallest Valve Area cannot be more than 6.0' }
           ],
           VDGradM: [
             { type: 'min', message: 'Highest Mean Gradient must be at least 0' },
             { type: 'max', message: 'Highest Mean Gradient cannot be more than 30' }
           ],
           VDTrAnnSize: [
             { type: 'min', message: 'Tricuspid Diameter must be at least 1.5' },
             { type: 'max', message: 'Tricuspid Diameter cannot be more than 10.0' }
           ],
           RVEDD: [
             { type: 'min', message: 'RVEDD must be at least 0.5' },
             { type: 'max', message: 'RVEDD cannot be more than 5.0' }
           ],
           VDGradP: [
             { type: 'min', message: 'Highest Mean Gradient must be at least 0' },
             { type: 'max', message: 'Highest Mean Gradient cannot be more than 200' }
           ]
         },
         sectionI: {
           LwstTemp: [
             { type: 'min', message: 'Lowest Temperature must be at least 5.0' },
             { type: 'max', message: 'Lowest Temperature cannot be more than 40.0' }
           ],
           LwstIntraHemo: [
             { type: 'min', message: 'Lowest Intra-op Hemoglobin must be at least 1.0' },
             { type: 'max', message: 'Lowest Intra-op Hemoglobin cannot be more than 50.0' }
           ],
           LwstHct: [
             { type: 'min', message: 'Lowest Intra-op Hematocrit must be at least 1.0' },
             { type: 'max', message: 'Lowest Intra-op Hematocrit cannot be more than 99.99' }
           ],
           HighIntraGlu: [
             { type: 'min', message: 'Highest Intra-op Glucose must be at least 40' },
             { type: 'max', message: 'Highest Intra-op Glucose cannot be more than 2000' }
           ],
           DHCATm: [
             { type: 'min', message: 'Circulatory Arrest Without Cerebral Perfusion Time must be at least 0' },
             {
               type: 'max',
               message: 'Circulatory Arrest Without Cerebral Perfusion Time cannot be more than 300'
             }
           ],
           CPerfTime: [
             { type: 'min', message: 'Cerebral Perfusion Time must be at least 1' },
             { type: 'max', message: 'Cerebral Perfusion Time cannot be more than 999' }
           ],
           XClampTm: [
             { type: 'min', message: 'Cross Clamp Time must be at least 0' },
             { type: 'max', message: 'Cross Clamp Time cannot be more than 600' }
           ],
           IBdRBCU: [
             { type: 'min', message: 'PRC must be at least 0' },
             { type: 'max', message: 'PRC cannot be more than 99' }
           ],
           IBdFFPU: [
             { type: 'min', message: 'FFP must be at least 0' },
             { type: 'max', message: 'FFP cannot be more than 99' }
           ],
           IBdPlatU: [
             { type: 'min', message: 'Platelet must be at least 0' },
             { type: 'max', message: 'Platelet cannot be more than 99' }
           ],
           IBdCryoU: [
             { type: 'min', message: 'Cryoprecipitate must be at least 0' },
             { type: 'max', message: 'Cryoprecipitate cannot be more than 99' }
           ],
           PRepAGradM: [
             { type: 'min', message: 'Mean Aortic Gradient must be at least 0' },
             { type: 'max', message: 'Mean Aortic Gradient cannot be more than 200' }
           ],
           PRepMGradM: [
             { type: 'min', message: 'Mean Mitral Gradient must be at least 0' },
             { type: 'max', message: 'Mean Mitral Gradient cannot be more than 30' }
           ],
           PRepTGradM: [
             { type: 'min', message: 'Mean Tricuspid Gradient must be at least 0' },
             { type: 'max', message: 'Mean Tricuspid Gradient cannot be more than 100' }
           ],
           PPEF: [
             { type: 'min', message: 'Ejection Fraction must be at least 1.0' },
             { type: 'max', message: 'Ejection Fraction cannot be more than 99.0' }
           ]
         },
         sectionJ: {
           NumIMADA: [
             { type: 'min', message: 'must be at least 0' },
             { type: 'max', message: 'cannot be more than 6' }
           ]
         },
         sectionK: {},
         sectionL: {},
         sectionL2: {},
         sectionM: {},
         sectionM1: {},
         sectionM2: {},
         sectionM3: {},
         sectionN: {},
         sectionO: {},
         sectionP: {},
         sectionQ: {},
         sectionR: {}
       };
