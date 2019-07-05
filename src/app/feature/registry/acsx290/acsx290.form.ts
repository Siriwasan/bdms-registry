import { Validators } from '@angular/forms';

export const ACSx290form = {
         sectionA: {
           HN: [null, Validators.required],
           AN: [null, Validators.required]
         },
         sectionB: {
           PatLName: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
           PatFName: [null, Validators.required],
           PatMName: [null],
           DOB: [null, Validators.required],
           Age: [null, Validators.required],
           Gender: [null, Validators.required],
           SSN: [null, Validators.required],
           PatAddr: [null],
           PatCity: [null, Validators.required],
           PatRegion: [null, Validators.required],
           PatientCountry: [null, Validators.required],
           PermAddr: [null, Validators.required]
         },
         sectionD: {
           HeightCM: [null, [Validators.required, Validators.min(20), Validators.max(251)]],
           WeightKg: [null, [Validators.required, Validators.min(10), Validators.max(250)]],
           FHCAD: [null, Validators.required],
           Diabetes: [null, Validators.required],
           DiabCtrl: [null, Validators.required],
           Dyslip: [null, Validators.required],
           Dialysis: [null, Validators.required],
           Hypertn: [null, Validators.required],
           InfEndo: [null, Validators.required],
           InfEndTy: [null, Validators.required],
           InfEndCult: [null, Validators.required],
           TobaccoUse: [null, Validators.required],
           ChrLungD: [null, Validators.required],
           ChrLungDType: [null, Validators.required],
           PFT: [null, Validators.required],
           FEV1: [null, [Validators.required, Validators.min(10), Validators.max(200)]],
           DLCO: [null, Validators.required],
           DLCOPred: [null, [Validators.required, Validators.min(10), Validators.max(200)]],
           ABG: [null, Validators.required],
           PCO2: [null, [Validators.required, Validators.min(20), Validators.max(120)]],
           PO2: [null, [Validators.required, Validators.min(40), Validators.max(500)]],
           HmO2: [null, Validators.required],
           BDTx: [null, Validators.required],
           SlpApn: [null, Validators.required],
           Pneumonia: [null, Validators.required],
           IVDrugAb: [null, Validators.required],
           Depression: [null, Validators.required],
           Alcohol: [null, Validators.required],
           LiverDis: [null, Validators.required],
           LiverChildPugh: [null, Validators.required],
           LiverTransList: [null, Validators.required],
           LiverStatusPost: [null, Validators.required],
           ImmSupp: [null, Validators.required],
           MediastRad: [null, Validators.required],
           Cancer: [null, Validators.required],
           PVD: [null, Validators.required],
           ThAoDisease: [null, Validators.required],
           Syncope: [null, Validators.required],
           UnrespStat: [null, Validators.required],
           ChestWallDef: [null, Validators.required],
           CVD: [null, Validators.required],
           CVA: [null, Validators.required],
           CVAWhen: [null, Validators.required],
           CVDTIA: [null, Validators.required],
           CVDCarSten: [null, Validators.required],
           CVDStenRt: [null, Validators.required],
           CVDStenLft: [null, Validators.required],
           CVDPCarSurg: [null, Validators.required],
           WBC: [null, [Validators.min(100), Validators.max(99990)]],
           RFHemoglobin: [null, [Validators.min(1.0), Validators.max(50.0)]],
           Hct: [null, [Validators.min(1.0), Validators.max(99.99)]],
           Platelets: [null, [Validators.min(1000), Validators.max(900000)]],
           CreatLst: [null, [Validators.min(0.1), Validators.max(30.0)]],
           TotAlbumin: [null, [Validators.min(1.0), Validators.max(10.0)]],
           TotBlrbn: [null, [Validators.min(0.1), Validators.max(50.0)]],
           A1cLvl: [null, [Validators.min(1.0), Validators.max(20.0)]],
           HITAnti: [null],
           INR: [null, [Validators.min(0.5), Validators.max(30.0)]],
           MELDScr: [null, [Validators.min(-50), Validators.max(150)]],
           BNP: [null, [Validators.min(5), Validators.max(70000)]],
           FiveMWalkTest: [null],
           FiveMWalk1: [null, [Validators.min(1), Validators.max(100)]],
           FiveMWalk2: [null, [Validators.min(1), Validators.max(100)]],
           FiveMWalk3: [null, [Validators.min(1), Validators.max(100)]],
           SixMWalkDone: [null],
           SixMWalkDist: [null, [Validators.min(1), Validators.max(3000)]]
         },
         sectionE: {
           PrCVInt: [null, Validators.required],
           PrCAB: [null, Validators.required],
           PrValve: [null, Validators.required],
           PrValveProc1: [null, Validators.required],
           PrValveProc2: [null, Validators.required],
           PrValveProc3: [null, Validators.required],
           PrValveProc4: [null, Validators.required],
           PrValveProc5: [null, Validators.required],
           POCPCI: [null, Validators.required],
           POCPCIWhen: [null, Validators.required],
           POCPCIndSurg: [null, Validators.required],
           POCPCISt: [null, Validators.required],
           POCPCIStTy: [null, Validators.required],
           POCPCIIn: [null, Validators.required],
           POC: [null, Validators.required],
           POCInt1: [null, Validators.required],
           POCInt2: [null, Validators.required],
           POCInt3: [null, Validators.required],
           POCInt4: [null, Validators.required],
           POCInt5: [null, Validators.required],
           POCInt6: [null, Validators.required],
           POCInt7: [null, Validators.required]
         },
         sectionF: {
           PrevMI: [null, Validators.required],
           MIWhen: [null, Validators.required],
           CardSympTimeOfAdm: [null, Validators.required],
           CardSympTimeOfSurg: [null, Validators.required],
           HeartFail: [null, Validators.required],
           HeartFailTmg: [null, Validators.required],
           HeartFailType: [null, Validators.required],
           ClassNYH: [null, Validators.required],
           CarShock: [null, Validators.required],
           Resusc: [null, Validators.required],
           Arrhythmia: [null, Validators.required],
           ArrhythPPaced: [null, Validators.required],
           ArrhythVV: [null, Validators.required],
           ArrhythSSS: [null, Validators.required],
           ArrhythAFlutter: [null, Validators.required],
           ArrhythAFib: [null, Validators.required],
           ArrhythAtrFib: [null, Validators.required],
           ArrhythSecond: [null, Validators.required],
           ArrhythThird: [null, Validators.required]
         },
         sectionG: {
           MedACEI48: [null, Validators.required],
           MedAmiodarone: [null, Validators.required],
           MedBeta: [null, Validators.required],
           MedBetaTher: [null, Validators.required],
           MedCChanTher: [null, Validators.required],
           MedLongActNit: [null, Validators.required],
           MedNitIV: [null, Validators.required],
           MedOthAntiang: [null, Validators.required],
           MedADP5Days: [null, Validators.required],
           MedADPIDis: [null, Validators.required],
           MedASA: [null, Validators.required],
           MedASADis: [null, Validators.required],
           MedASAOnce: [null, Validators.required],
           MedGP: [null, Validators.required],
           MedACoag: [null, Validators.required],
           MedACMN: [null, Validators.required],
           MedCoum5Days: [null, Validators.required],
           MedCoum5Dis: [null, Validators.required],
           MedXa5Days: [null, Validators.required],
           MedXa5DDis: [null, Validators.required],
           MedNOAC5Days: [null, Validators.required],
           MedNOACDisc: [null, Validators.required],
           MedThromIn5Days: [null, Validators.required],
           MedThromInDisc: [null, Validators.required],
           MedThrom: [null, Validators.required],
           MedInotr: [null, Validators.required],
           MedLipid: [null, Validators.required],
           MedLipType: [null, Validators.required],
           MedSter: [null, Validators.required]
         },
         sectionH: {
           CarCathPer: [null, Validators.required],
           CarCathDt: [null, Validators.required],
           CorAnatDisKnown: [null, Validators.required],
           Dominance: [null, Validators.required],
           StenSource: [null, Validators.required],
           NumDisV: [null, Validators.required],
           PctStenKnown: [null, Validators.required],
           GraftsPrsnt: [null, Validators.required],
           StentPrsnt: [null, Validators.required],
           FFRPerf: [null, Validators.required],
           IFRPerf: [null, Validators.required],

           // cath finding
           PctStenLMain: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenLMain: [null, Validators.required],
           StntStenLMain: [null, Validators.required],
           FFRLMain: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRLMain: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenProxLAD: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenProxLAD: [null, Validators.required],
           StntStenProxLAD: [null, Validators.required],
           FFRProxLAD: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRProxLAD: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenMidLAD: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenMidLAD: [null, Validators.required],
           StntStenMidLAD: [null, Validators.required],
           FFRMidLAD: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRMidLAD: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenDistLAD: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenDistLAD: [null, Validators.required],
           StntStenDistLAD: [null, Validators.required],
           FFRDistLAD: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRDistLAD: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenDiag1: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenDiag1: [null, Validators.required],
           StntStenDiag1: [null, Validators.required],
           FFRDiag1: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRDiag1: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenDiag2: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenDiag2: [null, Validators.required],
           StntStenDiag2: [null, Validators.required],
           FFRDiag2: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRDiag2: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenDiag3: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenDiag3: [null, Validators.required],
           StntStenDiag3: [null, Validators.required],
           FFRDiag3: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRDiag3: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenCircflx: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenCircflx: [null, Validators.required],
           StntStenCircflx: [null, Validators.required],
           FFRCircflx: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRCircflx: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenOM1: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenOM1: [null, Validators.required],
           StntStenOM1: [null, Validators.required],
           FFROM1: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFROM1: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenOM2: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenOM2: [null, Validators.required],
           StntStenOM2: [null, Validators.required],
           FFROM2: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFROM2: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenOM3: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenOM3: [null, Validators.required],
           StntStenOM3: [null, Validators.required],
           FFROM3: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFROM3: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenRamus: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenRamus: [null, Validators.required],
           StntStenRamus: [null, Validators.required],
           FFRRamus: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRRamus: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenRCA: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenRCA: [null, Validators.required],
           StntStenRCA: [null, Validators.required],
           FFRRCA: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRRCA: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenAM: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenAM: [null, Validators.required],
           StntStenAM: [null, Validators.required],
           FFRAM: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRAM: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenPDA: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenPDA: [null, Validators.required],
           StntStenPDA: [null, Validators.required],
           FFRPDA: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRPDA: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           PctStenPLB: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           GrftStenPLB: [null, Validators.required],
           StntStenPLB: [null, Validators.required],
           FFRPLB: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],
           IFRPLB: [null, [Validators.required, Validators.min(0.0), Validators.max(1.0)]],

           SyntaxScrKnown: [null, Validators.required],
           SyntaxScr: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           StressTst: [null, Validators.required],
           StrsTstRes: [null, Validators.required],
           HDEFD: [null, Validators.required],
           HDEF: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
           DimAvail: [null, Validators.required],
           LVSD: [null, [Validators.required, Validators.min(0.0), Validators.max(99.0)]],
           LVEDD: [null, [Validators.required, Validators.min(20.0), Validators.max(100.0)]],
           PASYSMeas: [null, Validators.required],
           PASYS: [null, [Validators.required, Validators.min(10), Validators.max(150)]],

           VDInsufA: [null, Validators.required],
           VDAVEccJet: [null, Validators.required],
           VDAort: [null, Validators.required],
           VDStenA: [null, Validators.required],
           AoHemoDatAvail: [null, Validators.required],
           VDAoVA: [null, [Validators.required, Validators.min(0.2), Validators.max(5.0)]],
           VDGradA: [null, [Validators.required, Validators.min(0), Validators.max(200)]],
           VDVMax: [null, [Validators.required, Validators.min(0), Validators.max(8)]],
           VDAoPrimEt: [null, Validators.required],
           VDAoSievers: [null, Validators.required],

           VDInsufM: [null, Validators.required],
           VDMVEccJet: [null, Validators.required],
           VDMit: [null, Validators.required],
           VDStenM: [null, Validators.required],
           MiHemoDatAvail: [null, Validators.required],
           VDMVA: [null, [Validators.required, Validators.min(0.6), Validators.max(6.0)]],
           VDGradM: [null, [Validators.required, Validators.min(0), Validators.max(30)]],
           VDMiPrimEt: [null, Validators.required],
           VDMiPrimLes: [null, Validators.required],

           VDInsufT: [null, Validators.required],
           VDTrAnnMeas: [null, Validators.required],
           VDTrAnnSize: [null, [Validators.required, Validators.min(1.5), Validators.max(10.0)]],
           VDTr: [null, Validators.required],
           VDStenT: [null, Validators.required],
           VDTrPrimEt: [null, Validators.required],

           VDInsufP: [null, Validators.required],
           VDPulm: [null, Validators.required],
           RVEDDKnown: [null, Validators.required],
           RVEDD: [null, [Validators.required, Validators.min(0.5), Validators.max(5.0)]],
           VDStenP: [null, Validators.required],
           PuHemoDatAvail: [null, Validators.required],
           VDGradP: [null, [Validators.required, Validators.min(0), Validators.max(200)]],
           VDPuEt: [null, Validators.required]
         },
         sectionI: {
           Surgeon: [null, Validators.required],
           RiskDiscussed: [null, Validators.required],
           STSscore: [null, Validators.required],
           Incidenc: [null, Validators.required],
           Status: [null, Validators.required],
           UrgEmergRsn: [null, Validators.required],

           PCancCase: [null, Validators.required],
           PCancCaseDt: [null, Validators.required],
           PCancCaseTmg: [null, Validators.required],
           PCancCaseRsn: [null, Validators.required],
           PCancCaseCAB: [null, Validators.required],
           PCancCaseMech: [null, Validators.required],
           PCancCaseONC: [null, Validators.required],
           PCancCaseValSur: [null, Validators.required],
           PCancCaseValTrans: [null, Validators.required],
           PCancCaseOC: [null, Validators.required],

           CCancCase: [null, Validators.required],
           CCancCaseTmg: [null, Validators.required],
           CCancCaseRsn: [null, Validators.required],
           CCancCaseCAB: [null, Validators.required],
           CCancCaseMech: [null, Validators.required],
           CCancCaseONC: [null, Validators.required],
           CCancCaseValSur: [null, Validators.required],
           CCancCaseValTrans: [null, Validators.required],
           CCancCaseOC: [null, Validators.required],

           OPApp: [null, Validators.required],
           ApproachCon: [null, Validators.required],
           Robotic: [null, Validators.required],
           RobotTim: [null, Validators.required],

           OpCAB: [null, Validators.required],
           OpValve: [null, Validators.required],
           OpValSurgInput: [null, Validators.required],
           AortProc: [null, Validators.required],
           AortProcSurgInput: [null, Validators.required],
           OpOCard: [null, Validators.required],
           AFibProc: [null, Validators.required],
           AFibProcSurgInput: [null, Validators.required],
           OpONCard: [null, Validators.required],

           OREntryDT: [null, Validators.required],
           ORExitDT: [null, Validators.required],
           GenAnes: [null, Validators.required],
           ProcSed: [null, Validators.required],
           Intubate: [null, Validators.required],
           IntubateDT: [null, Validators.required],
           ExtubateDT: [null, Validators.required],
           SIStartDT: [null, Validators.required],
           SIStopDT: [null, Validators.required],
           AnesEndDT: [null, Validators.required],
           AbxSelect: [null, Validators.required],
           AbxTiming: [null, Validators.required],
           AbxDisc: [null, Validators.required],
           AddIntraopPAnti: [null, Validators.required],
           TempMeas: [null, Validators.required],
           LwstTemp: [null, [Validators.required, Validators.min(5.0), Validators.max(40.0)]],
           LwstTempSrc: [null, Validators.required],
           LwstIntraHemo: [null, [Validators.required, Validators.min(1.0), Validators.max(50.0)]],
           LwstHct: [null, [Validators.required, Validators.min(1.0), Validators.max(99.99)]],
           HighIntraGlu: [null, [Validators.required, Validators.min(40), Validators.max(2000)]],

           CPBUtil: [null, Validators.required],
           CPBCmb: [null, Validators.required],
           CPBCmbR: [null, Validators.required],

           CanArtStAort: [null, Validators.required],
           CanArtStFem: [null, Validators.required],
           CanArtStAx: [null, Validators.required],
           CanArtStInn: [null, Validators.required],
           CanArtStO: [null, Validators.required],

           CanVenStFem: [null, Validators.required],
           CanVenStJug: [null, Validators.required],
           CanVenStRtA: [null, Validators.required],
           CanVenStLfA: [null, Validators.required],
           CanVenStPulm: [null, Validators.required],
           CanVenStBi: [null, Validators.required],
           CanVenStOth: [null, Validators.required],

           PerfusTm: [null, Validators.required],
           CircArr: [null, Validators.required],
           DHCATm: [null, [Validators.required, Validators.min(0), Validators.max(300)]],
           CPerfUtil: [null, Validators.required],
           CPerfTime: [null, [Validators.required, Validators.min(1), Validators.max(999)]],
           CPerfTyp: [null, Validators.required],
           TotCircArrTm: [null, Validators.required],

           AortOccl: [null, Validators.required],
           XClampTm: [null, [Validators.required, Validators.min(0), Validators.max(600)]],
           CplegiaDeliv: [null, Validators.required],
           CplegiaType: [null, Validators.required],
           CerOxUsed: [null, Validators.required],
           ConCalc: [null, Validators.required],
           AsmtAscAA: [null, Validators.required],
           AsmtAoDxMeth: [null, Validators.required],
           AsmtAoDx: [null, Validators.required],
           AsmtAPln: [null, Validators.required],

           IBldProdRef: [null, Validators.required],
           IBldProd: [null, Validators.required],
           IBdRBCU: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
           IBdFFPU: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
           IBdPlatU: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
           IBdCryoU: [null, [Validators.required, Validators.min(0), Validators.max(99)]],

           IntraClotFact: [null, Validators.required],
           IntraopProComCon: [null, Validators.required],
           IMedEACA: [null, Validators.required],
           IMedTran: [null, Validators.required],

           InOpTEE: [null, Validators.required],
           PRepAR: [null, Validators.required],
           PRepAGradM: [null, [Validators.required, Validators.min(0), Validators.max(200)]],
           PRepAPVL: [null, Validators.required],
           PRepMR: [null, Validators.required],
           PRepMGradM: [null, [Validators.required, Validators.min(0), Validators.max(30)]],
           PRepMPVL: [null, Validators.required],
           PRepTR: [null, Validators.required],
           PRepTGradM: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
           PRepTPVL: [null, Validators.required],
           PPEFMeas: [null, Validators.required],
           PPEF: [null, [Validators.required, Validators.min(1.0), Validators.max(99.0)]],
           PPPlanedPCI: [null, Validators.required]
         },
         sectionJ: {
           IMAUsed: [null, Validators.required],
           NoIMARsn: [null, Validators.required],
           NumIMADA: [null, [Validators.required, Validators.min(0), Validators.max(6)]],
           LeftIMA: [null, Validators.required],
           LIMAHarvTech: [null, Validators.required],
           RightIMA: [null, Validators.required],
           RIMAHarvTech: [null, Validators.required],
           RadialArtUsed: [null, Validators.required],
           NumRadDA: [null, [Validators.required, Validators.min(0), Validators.max(6)]],
           RadHTech: [null, Validators.required],
           RadHarvPrepTm: [null, [Validators.required, Validators.min(0), Validators.max(240)]],
           VenousCondUsed: [null, Validators.required],
           DistVein: [null, [Validators.required, Validators.min(0), Validators.max(9)]],
           DistVeinHTech: [null, Validators.required],
           SaphHarPrepTm: [null, [Validators.required, Validators.min(0), Validators.max(240)]],
           NumOArtD: [null, [Validators.required, Validators.min(0), Validators.max(6)]],
           NumArtVenComp: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
           NumVenArtComp: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
           NumArtArtComp: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
           ProxTech: [null, Validators.required],

           CAB01: [null, Validators.required],
           CABDistSite01: [null, Validators.required],
           CABProximalSite01: [null, Validators.required],
           CABConduit01: [null, Validators.required],
           CABDistPos01: [null, Validators.required],
           CABEndArt01: [null, Validators.required],
           CABVeinPatAng01: [null, Validators.required],

           CAB02: [null, Validators.required],
           CABDistSite02: [null, Validators.required],
           CABProximalSite02: [null, Validators.required],
           CABConduit02: [null, Validators.required],
           CABDistPos02: [null, Validators.required],
           CABEndArt02: [null, Validators.required],
           CABVeinPatAng02: [null, Validators.required],

           CAB03: [null, Validators.required],
           CABDistSite03: [null, Validators.required],
           CABProximalSite03: [null, Validators.required],
           CABConduit03: [null, Validators.required],
           CABDistPos03: [null, Validators.required],
           CABEndArt03: [null, Validators.required],
           CABVeinPatAng03: [null, Validators.required],

           CAB04: [null, Validators.required],
           CABDistSite04: [null, Validators.required],
           CABProximalSite04: [null, Validators.required],
           CABConduit04: [null, Validators.required],
           CABDistPos04: [null, Validators.required],
           CABEndArt04: [null, Validators.required],
           CABVeinPatAng04: [null, Validators.required],

           CAB05: [null, Validators.required],
           CABDistSite05: [null, Validators.required],
           CABProximalSite05: [null, Validators.required],
           CABConduit05: [null, Validators.required],
           CABDistPos05: [null, Validators.required],
           CABEndArt05: [null, Validators.required],
           CABVeinPatAng05: [null, Validators.required],

           CAB06: [null, Validators.required],
           CABDistSite06: [null, Validators.required],
           CABProximalSite06: [null, Validators.required],
           CABConduit06: [null, Validators.required],
           CABDistPos06: [null, Validators.required],
           CABEndArt06: [null, Validators.required],
           CABVeinPatAng06: [null, Validators.required],

           CAB07: [null, Validators.required],
           CABDistSite07: [null, Validators.required],
           CABProximalSite07: [null, Validators.required],
           CABConduit07: [null, Validators.required],
           CABDistPos07: [null, Validators.required],
           CABEndArt07: [null, Validators.required],
           CABVeinPatAng07: [null, Validators.required],

           CAB08: [null, Validators.required],
           CABDistSite08: [null, Validators.required],
           CABProximalSite08: [null, Validators.required],
           CABConduit08: [null, Validators.required],
           CABDistPos08: [null, Validators.required],
           CABEndArt08: [null, Validators.required],
           CABVeinPatAng08: [null, Validators.required],

           CAB09: [null, Validators.required],
           CABDistSite09: [null, Validators.required],
           CABProximalSite09: [null, Validators.required],
           CABConduit09: [null, Validators.required],
           CABDistPos09: [null, Validators.required],
           CABEndArt09: [null, Validators.required],
           CABVeinPatAng09: [null, Validators.required],

           CAB10: [null, Validators.required],
           CABDistSite10: [null, Validators.required],
           CABProximalSite10: [null, Validators.required],
           CABConduit10: [null, Validators.required],
           CABDistPos10: [null, Validators.required],
           CABEndArt10: [null, Validators.required],
           CABVeinPatAng10: [null, Validators.required]
         },
         sectionK: {
           ValExp: [null, Validators.required],
           ValExpPos: [null, Validators.required],
           ValExpTyp: [null, Validators.required],
           ValExpEt: [null, Validators.required],
           ValExpDevKnown: [null, Validators.required],
           ValExpDev: [null, Validators.required],
           ValExpUDI: [null, Validators.required],
           ValExp2: [null, Validators.required],
           ValExpPos2: [null, Validators.required],
           ValExpTyp2: [null, Validators.required],
           ValExpEt2: [null, Validators.required],
           ValExpDevKnown2: [null, Validators.required],
           ValExpDev2: [null, Validators.required],
           ValExpUDI2: [null, Validators.required],

           //  AORTIC VALVE
           VSAV: [null, Validators.required],
           VSAVPr: [null, Validators.required],
           VSTCV: [null, Validators.required],
           VSTCVR: [null, Validators.required],
           VSAVSurgRep: [null, Validators.required],
           VSAVSurgType: [null, Validators.required],
           VSAVSurgBioT: [null, Validators.required],

           VSAVRComA: [null, Validators.required],
           VSAVRExSutAn: [null, Validators.required],
           VSAVRLPlic: [null, Validators.required],
           VSAVRNodRel: [null, Validators.required],
           VSAVRPTFE: [null, Validators.required],
           VSAVRComRS: [null, Validators.required],
           VSAVRRaphe: [null, Validators.required],
           VSAVRRingA: [null, Validators.required],
           VSAVRRingATy: [null, Validators.required],
           VSAVRLResect: [null, Validators.required],
           VSAVRLeafShav: [null, Validators.required],
           VSAVRLPPatch: [null, Validators.required],
           VSAVRDeb: [null, Validators.required],
           VSAVRPeriLeak: [null, Validators.required],
           AnlrEnl: [null, Validators.required],
           AnlrEnlTech: [null, Validators.required],
           VSAVRoot: [null, Validators.required],
           VSAVRootOReimp: [null, Validators.required],
           VSAVRootOReimpTy: [null, Validators.required],
           VSAVRepBioTy: [null, Validators.required],
           VSAVSparRt: [null, Validators.required],
           VSAVSparRtOp: [null, Validators.required],
           VSAVRootRecon: [null, Validators.required],
           VSAVPat: [null, Validators.required],
           VSAVPatTy: [null, Validators.required],
           AorticImplant: [null, Validators.required],
           VSAoIm: [null, Validators.required],
           VSAoImSz: [null, [Validators.required, Validators.min(5), Validators.max(100)]],
           VSAoImUDI: [null, Validators.required],

           //  MITRAL VALVE
           VSMV: [null, Validators.required],
           VSMVPr: [null, Validators.required],
           VSMVRepApp: [null, Validators.required],
           VSMitRAnnulo: [null, Validators.required],

           //  LEAFLET RESECTION
           VSMitRLeafRes: [null, Validators.required],
           VSLeafResTyp: [null, Validators.required],
           VSLeafAntRes: [null, Validators.required],
           VSLeafAntResLocD: [null, Validators.required],
           VSLeafAntResA1: [null, Validators.required],
           VSLeafAntResA2: [null, Validators.required],
           VSLeafAntResA3: [null, Validators.required],
           VSLeafPostRes: [null, Validators.required],
           VSLeafPostResLocD: [null, Validators.required],
           VSLeafPostResP1: [null, Validators.required],
           VSLeafPostResP2: [null, Validators.required],
           VSLeafPostResP3: [null, Validators.required],
           VSLeafComRes: [null, Validators.required],
           VSLeafComResLoc: [null, Validators.required],

           //  NEOCORDS (PTFE)
           VSMitRPTFE: [null, Validators.required],
           VSNeoAnt: [null, Validators.required],
           VSNeoAntLocD: [null, Validators.required],
           VSNeoAntA1: [null, Validators.required],
           VSNeoAntA2: [null, Validators.required],
           VSNeoAntA3: [null, Validators.required],
           VSNeoPost: [null, Validators.required],
           VSNeoPostLocD: [null, Validators.required],
           VSNeoPostP1: [null, Validators.required],
           VSNeoPostP2: [null, Validators.required],
           VSNeoPostP3: [null, Validators.required],
           VSNeoCom: [null, Validators.required],
           VSNeoComLoc: [null, Validators.required],

           //  NEOCORDS (PTFE)
           VSMitRChord: [null, Validators.required],
           VSChorLfAnt: [null, Validators.required],
           VSChorLfAntLocD: [null, Validators.required],
           VSChorLfAntA1: [null, Validators.required],
           VSChorLfAntA2: [null, Validators.required],
           VSChorLfAntA3: [null, Validators.required],
           VSChorLfPost: [null, Validators.required],
           VSChorLfPostLocD: [null, Validators.required],
           VSChorLfPostP1: [null, Validators.required],
           VSChorLfPostP2: [null, Validators.required],
           VSChorLfPostP3: [null, Validators.required],
           VSChorLfCom: [null, Validators.required],
           VSChorLfComLoc: [null, Validators.required],

           VSMitRFold: [null, Validators.required],
           VSMitRSlidP: [null, Validators.required],
           VSMitRADecalc: [null, Validators.required],
           VSMitRLeafERP: [null, Validators.required],
           VSMitRLeafERPLoc: [null, Validators.required],
           VSMitREdge: [null, Validators.required],
           VSMitRMitComm: [null, Validators.required],
           VSMitRMitCplasty: [null, Validators.required],
           VSMitRMitCleft: [null, Validators.required],
           VSMitParaprosLeak: [null, Validators.required],

           MitralIntent: [null, Validators.required],
           VSChorPres: [null, Validators.required],
           VSTCVMit: [null, Validators.required],

           MitralImplant: [null, Validators.required],
           MitralImplantTy: [null, Validators.required],
           VSMiIm: [null, Validators.required],
           VSMiImSz: [null, [Validators.required, Validators.min(5), Validators.max(100)]],
           VSMiImUDI: [null, Validators.required]
         },
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
