import { Validators } from '@angular/forms';

export const CathPCI50Form = {
  sectionA: {
    registryId: [null, Validators.required],
    HN: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    AN: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
    LastName: [null, Validators.required],
    FirstName: [null, Validators.required],
    MidName: [null, Validators.required],
    SSN: [null, Validators.required],
    DOB: [null, Validators.required],
    Age: [null, [Validators.required, Validators.min(0), Validators.max(120)]],
    Sex: [null, Validators.required],
    ZipCode: [null, Validators.required],
    Race: [null, Validators.required],
    RaceAsian: [null, Validators.required],
    HispOrig: [null, Validators.required],
    HispEthnicityType: [null, Validators.required],
    PatNation: [null, Validators.required],
    PermAddr: [null, Validators.required]
  },
  sectionB: {
    HospName: [null, Validators.required],
    PayorPrim: [null, Validators.required],
    PayorSecond: [null, Validators.required],
    ArrivalDateTime: [null, Validators.required],
    AdmProvider: [null, Validators.required],
    AttProvider: [null, Validators.required]
  },
  sectionC: {
    Hypertension: [null, Validators.required],
    Dyslipidemia: [null, Validators.required],
    HxMI: [null, Validators.required],
    HxMIDate: [null, Validators.required],
    PriorPCI: [null, Validators.required],
    HxPCIDate: [null, Validators.required],
    LMPCI: [null, Validators.required],
    Height: [null, Validators.required],
    Weight: [null, Validators.required],
    FamilyHxCAD: [null, Validators.required],
    HxCVD: [null, Validators.required],
    PriorPAD: [null, Validators.required],
    HxChronicLungDisease: [null, Validators.required],
    PriorCABG: [null, Validators.required],
    HxCABGDate: [null, Validators.required],
    TobaccoUse: [null, Validators.required],
    TobaccoType: [null, Validators.required],
    SmokeAmount: [null, Validators.required],
    CAOutHospital: [null, Validators.required],
    CAWitness: [null, Validators.required],
    CAPostEMS: [null, Validators.required],
    InitCARhythm: [null, Validators.required],
    CATransferFac: [null, Validators.required],
    Diabetes: [null, Validators.required],
    CurrentDialysis: [null, Validators.required],
    CSHAScale: [null, Validators.required]
  },
  sectionD: {
    HxHF: [null, Validators.required],
    PriorNYHA: [null, Validators.required],
    HFNewDiag: [null, Validators.required],
    HFType: [null, Validators.required],
    ECAssessMethod: [null, Validators.required],
    ECGResults: [null, Validators.required],
    AntiArrhyTherapy: [null, Validators.required],
    ECGFindings: [null, Validators.required],
    HR: [null, Validators.required],
    NSVTType: [null, Validators.required],
    StressPerformed: [null, Validators.required],
    StressTestType: [null, Validators.required],
    StressTestDate: [null, Validators.required],
    StressTestResult: [null, Validators.required],
    StressTestRisk: [null, Validators.required],
    CardiacCTA: [null, Validators.required],
    CardiacCTADate: [null, Validators.required],
    CardiacCTAResults: [null, Validators.required],
    CalciumScoreAssessed: [null, Validators.required],
    CalciumScore: [null, Validators.required],
    CalciumScoreDate: [null, Validators.required],
    PreProcLVEFAssessed: [null, Validators.required],
    PreProcLVEF: [null, Validators.required],
    PriorDxAngioProc: [null, Validators.required],
    PriorDxAngioDate: [null, Validators.required],
    PriorDxAngioResults: [null, Validators.required],
    PreProcMedASA: [null, Validators.required],
    PreProcMedBetaBlocker: [null, Validators.required],
    PreProcMedCaBlocker: [null, Validators.required],
    PreProcMedAntiArrhythmic: [null, Validators.required],
    PreProcMedLongActNitrate: [null, Validators.required],
    PreProcMedRanolazine: [null, Validators.required],
    PreProcMedStatin: [null, Validators.required],
    PreProcMedNonStatin: [null, Validators.required],
    PreProcMedPCSK9: [null, Validators.required]
  },
  sectionE: {
    ProcedureStartDateTime: [null, Validators.required],
    ProcedureEndDateTime: [null, Validators.required],
    DiagCorAngio: [null, Validators.required],
    DCathProvider: [null, Validators.required],
    PCIProc: [null, Validators.required],
    PCIProvider: [null, Validators.required],
    LeftHeartCath: [null, Validators.required],
    PrePCILVEF: [null, Validators.required],
    ConcomProc: [null, Validators.required],
    ConcomProcType: [null, Validators.required],
    AccessSite: [null, Validators.required],
    AccessSiteClosure: [null, Validators.required],
    Crossover: [null, Validators.required],
    CrossoverClosure: [null, Validators.required],
    Simultaneous: [null, Validators.required],
    SimultaneousClosure: [null, Validators.required],
    VenousAccess: [null, Validators.required],
    VenousAccessClosure: [null, Validators.required],
    ProcSystolicBP: [null, Validators.required],
    CAInHosp: [null, Validators.required],
    FluoroTime: [null, Validators.required],
    ContrastVol: [null, Validators.required],
    FluoroDoseKerm: [null, Validators.required],
    FluoroDoseDAP: [null, Validators.required]
  },
  sectionF: {
    PreProcTnILab: [null, Validators.required],
    PreProcTnI: [null, Validators.required],
    PreProcTnTLab: [null, Validators.required],
    PreProcTnT: [null, Validators.required],
    PreProcCreatLab: [null, Validators.required],
    PreProcCreat: [null, Validators.required],
    HGBLab: [null, Validators.required],
    HGB: [null, Validators.required],
    LipidsTCLab: [null, Validators.required],
    LipidsTC: [null, Validators.required],
    LipidsHDLLab: [null, Validators.required],
    LipidsHDL: [null, Validators.required],
    PostProcTnILab: [null, Validators.required],
    PostProcTnI: [null, Validators.required],
    PostProcTnTLab: [null, Validators.required],
    PostProcTnT: [null, Validators.required],
    PostProcCreatLab: [null, Validators.required],
    PostProcCreat: [null, Validators.required],
    PostProcHgbLab: [null, Validators.required],
    PostProcHgb: [null, Validators.required]
  },
  sectionG: {
    CathLabVisitIndication: [null, Validators.required],
    CPSxAssess: [null, Validators.required],
    CVInstability: [null, Validators.required],
    CVInstabilityType: [null, Validators.required],
    VSupport: [null, Validators.required],
    PharmVasoSupp: [null, Validators.required],
    MechVentSupp: [null, Validators.required],
    MVSupportDevice: [null, Validators.required],
    MVSupportTiming: [null, Validators.required],
    ASSeverity: [null, Validators.required],
    MSSeverity: [null, Validators.required],
    PSSeverity: [null, Validators.required],
    TSSeverity: [null, Validators.required],
    ARSeverity: [null, Validators.required],
    MRSeverity: [null, Validators.required],
    PRSeverity: [null, Validators.required],
    TRSeverity: [null, Validators.required],
    PreOPEval: [null, Validators.required],
    FuncCapacity: [null, Validators.required],
    SurgRisk: [null, Validators.required],
    OrganTransplantSurg: [null, Validators.required],
    OrganTransplantDonor: [null, Validators.required],
    OrganTransplantType: [null, Validators.required]
  },
  sectionH: {
    Dominance: [null, Validators.required],
    NVStenosis: [null, Validators.required],
    GraftStenosis: [null, Validators.required]
  },
  nativeLesion: {
    NVSegmentID: [null, Validators.required],
    NVCoroVesselStenosis: [null, Validators.required],
    NVAdjuncMeasObtained: [null, Validators.required],
    NV_FFR: [null, Validators.required],
    NV_IFR: [null, Validators.required],
    NV_IVUS: [null, Validators.required],
    NV_OCT: [null, Validators.required]
  },
  graftLesion: {
    GraftSegmentID: [null, Validators.required],
    GraftCoroVesselStenosis: [null, Validators.required],
    CABGGraftVessel: [null, Validators.required],
    GraftAdjuncMeasObtained: [null, Validators.required],
    Graft_FFR: [null, Validators.required],
    Graft_IFR: [null, Validators.required],
    Graft_IVUS: [null, Validators.required],
    Graft_OCT: [null, Validators.required]
  },
  sectionI: {
    PCIStatus: [null, Validators.required],
    HypothermiaInduced: [null, Validators.required],
    HypothermiaInducedTiming: [null, Validators.required],
    LOCProc: [null, Validators.required],
    PCIProcedureRisk: [null, Validators.required],
    PCIDecision: [null, Validators.required],
    CVTxDecision: [null, Validators.required],
    CVSheetDecision: [null, Validators.required],
    MultiVesselDz: [null, Validators.required],
    MultiVessProcType: [null, Validators.required],
    PCIIndication: [null, Validators.required],
    SymptomDate: [null, Validators.required],
    SymptomTime: [null, Validators.required],
    SymptomTimeUnk: [null, Validators.required],
    ThromTherapy: [null, Validators.required],
    ThromDateTime: [null, Validators.required],
    SyntaxScore: [null, Validators.required],
    SyntaxScoreValue: [null, Validators.required],
    StemiFirstNoted: [null, Validators.required],
    SubECGDateTime: [null, Validators.required],
    SubECGED: [null, Validators.required],
    PatientTransPCI: [null, Validators.required],
    EDPresentDateTime: [null, Validators.required],
    FirstDevActiDateTime: [null, Validators.required],
    PtPCIDelayReason: [null, Validators.required],
    PCIDelayReason: [null, Validators.required],
    Argatroban: [null, Validators.required],
    Bivalirudin: [null, Validators.required],
    Fondaparinux: [null, Validators.required],
    HeparinDerivative: [null, Validators.required],
    LMWH: [null, Validators.required],
    UFH: [null, Validators.required],
    Warfarin: [null, Validators.required],
    Vorapaxar: [null, Validators.required],
    GPIIbIIIa: [null, Validators.required],
    Apixaban: [null, Validators.required],
    Dabigatran: [null, Validators.required],
    Edoxaban: [null, Validators.required],
    Rivaroxaban: [null, Validators.required],
    Cangrelor: [null, Validators.required],
    Clopidogrel: [null, Validators.required],
    Prasugrel: [null, Validators.required],
    Ticagrelor: [null, Validators.required]
  },
  sectionJ: {
    StentTechnique: [null, Validators.required],
    ProxOptimize: [null, Validators.required],
    FinalKissBalloon: [null, Validators.required],
    PCIResult: [null, Validators.required]
  },
  pciLesion: {
    LesionCounter: [null, Validators.required],
    SegmentID: [null, Validators.required],
    CulpritArtery: [null, Validators.required],
    StenosisPriorTreat: [null, Validators.required],
    ChronicOcclusion: [null, Validators.required],
    PreProcTIMI: [null, Validators.required],
    PrevTreatedLesion: [null, Validators.required],
    PrevTreatedLesionDate: [null, Validators.required],
    PreviousStent: [null, Validators.required],
    InRestenosis: [null, Validators.required],
    InThrombosis: [null, Validators.required],
    StentType: [null, Validators.required],
    LesionGraft: [null, Validators.required],
    LesionGraftType: [null, Validators.required],
    LocGraft: [null, Validators.required],
    NavGraftNatLes: [null, Validators.required],
    LesionComplexity: [null, Validators.required],
    LesionLength: [null, Validators.required],
    SevereCalcification: [null, Validators.required],
    BifurcationLesion: [null, Validators.required],
    GuidewireLesion: [null, Validators.required],
    GuidewireAcross: [null, Validators.required],
    DeviceDeployed: [null, Validators.required],
    StenosisPostProc: [null, Validators.required],
    PostProcTIMI: [null, Validators.required],
    ComplicationPCI: [null, Validators.required],
  },
  pciDevice: {
    ICDevCounter: [null, Validators.required],
    ICDevID: [null, Validators.required],
    ICDevUDI: [null, Validators.required],
    ICDevCounterAssn: [null, Validators.required],
    DeviceDiameter: [null, Validators.required],
    DeviceLength: [null, Validators.required]
  },
  sectionK: {
    PerfSeg: [null, Validators.required],
    DissectionSeg: [null, Validators.required],
    K_BleedingAccessSite: [null, Validators.required],
    K_BleedingAccessSiteDT: [null, Validators.required],
    K_BleedingGI: [null, Validators.required],
    K_BleedingGIDT: [null, Validators.required],
    K_BleedingGU: [null, Validators.required],
    K_BleedingGUDT: [null, Validators.required],
    K_BleedingHematoma: [null, Validators.required],
    K_BleedingHematomaDT: [null, Validators.required],
    K_BleedingOther: [null, Validators.required],
    K_BleedingOtherDT: [null, Validators.required],
    K_BleedingRetro: [null, Validators.required],
    K_BleedingRetroDT: [null, Validators.required],
    K_CardiacArrest: [null, Validators.required],
    K_CardiacArrestDT: [null, Validators.required],
    K_CardiacTamponade: [null, Validators.required],
    K_CardiacTamponadeDT: [null, Validators.required],
    K_CardiogenicShock: [null, Validators.required],
    K_CardiogenicShockDT: [null, Validators.required],
    K_HeartFailure: [null, Validators.required],
    K_HeartFailureDT: [null, Validators.required],
    K_MyocardialInfarction: [null, Validators.required],
    K_MyocardialInfarctionDT: [null, Validators.required],
    K_MyocardialInfarctionCriteria: [null, Validators.required],
    K_MyocardialInfarctionFollowCriteria: [null, Validators.required],
    K_NewDialysis: [null, Validators.required],
    K_NewDialysisDT: [null, Validators.required],
    K_OtherVascular: [null, Validators.required],
    K_OtherVascularDT: [null, Validators.required],
    K_StrokeHemorrhage: [null, Validators.required],
    K_StrokeHemorrhageDT: [null, Validators.required],
    K_StrokeIschemic: [null, Validators.required],
    K_StrokeIschemicDT: [null, Validators.required],
    K_StrokeUndetermined: [null, Validators.required],
    K_StrokeUndeterminedDT: [null, Validators.required],
    PostTransfusion: [null, Validators.required],
    PRBCUnits: [null, Validators.required],
    TransfusPostPCI: [null, Validators.required],
    TransfusionPostSurg: [null, Validators.required]
  },
  sectionL: {
    HospIntervention: [null, Validators.required],
    HospInterventionType: [null, Validators.required],
    CABGStatus: [null, Validators.required],
    CABGIndication: [null, Validators.required],
    CABGDateTime: [null, Validators.required],
    DCCreatinineDrawn: [null, Validators.required],
    DCCreatinine: [null, Validators.required],
    DCHgbDrawn: [null, Validators.required],
    DCHgb: [null, Validators.required],
    DCDateTime: [null, Validators.required],
    DCProvider: [null, Validators.required],
    DC_Comfort: [null, Validators.required],
    DCStatus: [null, Validators.required],
    DCLocation: [null, Validators.required],
    CABGTransfer: [null, Validators.required],
    CABGPlannedDC: [null, Validators.required],
    DCHospice: [null, Validators.required],
    DC_CardRehab: [null, Validators.required],
    DC_LOC: [null, Validators.required],
    DeathProcedure: [null, Validators.required],
    DeathCause: [null, Validators.required],
    DC_ACEI: [null, Validators.required],
    DC_ACEIRN: [null, Validators.required],
    DC_Warfarin: [null, Validators.required],
    DC_WarfarinRN: [null, Validators.required],
    DC_Aspirin: [null, Validators.required],
    DC_AspirinRN: [null, Validators.required],
    DC_Vorapaxar: [null, Validators.required],
    DC_VorapaxarRN: [null, Validators.required],
    DC_ARB: [null, Validators.required],
    DC_ARBRN: [null, Validators.required],
    DC_BetaBlocker: [null, Validators.required],
    DC_BetaBlockerRN: [null, Validators.required],
    DC_Apixaban: [null, Validators.required],
    DC_ApixabanRN: [null, Validators.required],
    DC_Dabigatran: [null, Validators.required],
    DC_DabigatranRN: [null, Validators.required],
    DC_Edoxaban: [null, Validators.required],
    DC_EdoxabanRN: [null, Validators.required],
    DC_Rivaroxaban: [null, Validators.required],
    DC_RivaroxabanRN: [null, Validators.required],
    DC_Clopidogrel: [null, Validators.required],
    DC_ClopidogrelRN: [null, Validators.required],
    DC_Prasugrel: [null, Validators.required],
    DC_PrasugrelRN: [null, Validators.required],
    DC_Ticagrelor: [null, Validators.required],
    DC_TicagrelorRN: [null, Validators.required],
    DC_Ticlopidine: [null, Validators.required],
    DC_TiclopidineRN: [null, Validators.required],
    DC_Statin: [null, Validators.required],
    DC_StatinDose: [null, Validators.required],
    DC_StatinRN: [null, Validators.required],
    DC_NonStatin: [null, Validators.required],
    DC_NonStatinRN: [null, Validators.required],
    DC_Alirocumab: [null, Validators.required],
    DC_AlirocumabRN: [null, Validators.required],
    DC_Evolocumab: [null, Validators.required],
    DC_EvolocumabRN: [null, Validators.required],
    DC_MedReconCompleted: [null, Validators.required],
    DC_MedReconciled: [null, Validators.required]
  },
  sectionM: {
    FU_AssessmentDate: [null, Validators.required],
    RefProcStartDateTime: [null, Validators.required],
    RefArrivalDateTime: [null, Validators.required],
    RefDCDateTime: [null, Validators.required],
    FU_Method: [null, Validators.required],
    FU_Status: [null, Validators.required],
    FU_CPSxAssess: [null, Validators.required],
    FU_DeathDate: [null, Validators.required],
    FU_DeathCause: [null, Validators.required],

    //  FOLLOW UP EVENTS
    M_BleedingEvent: [null, Validators.required],
    M_BleedingEventDT: [null, Validators.required],
    M_CABGStent: [null, Validators.required],
    M_CABGStentLesions: [null, Validators.required],
    M_CABGStentDT: [null, Validators.required],
    M_CABGNonStent: [null, Validators.required],
    M_CABGNonStentDT: [null, Validators.required],
    M_NSTEMI: [null, Validators.required],
    M_NSTEMIDT: [null, Validators.required],
    M_Qwave: [null, Validators.required],
    M_QwaveDT: [null, Validators.required],
    M_STEMI: [null, Validators.required],
    M_STEMIDT: [null, Validators.required],
    M_MIUnknown: [null, Validators.required],
    M_MIUnknownDT: [null, Validators.required],
    M_PCINonStent: [null, Validators.required],
    M_PCINonStentDT: [null, Validators.required],
    M_PCIStent: [null, Validators.required],
    M_PCIStentLesions: [null, Validators.required],
    M_PCIStentDT: [null, Validators.required],
    M_Readmission: [null, Validators.required],
    M_ReadmissionDT: [null, Validators.required],
    M_StrokeHemorrhage: [null, Validators.required],
    M_StrokeHemorrhageDT: [null, Validators.required],
    M_StrokeIschemic: [null, Validators.required],
    M_StrokeIschemicDT: [null, Validators.required],
    M_StrokeUndetermined: [null, Validators.required],
    M_StrokeUndeterminedDT: [null, Validators.required],
    M_ThrombosisStent: [null, Validators.required],
    M_ThrombosisStentLesions: [null, Validators.required],
    M_ThrombosisStentDT: [null, Validators.required],
    M_ThrombosisNonStent: [null, Validators.required],
    M_ThrombosisNonStentDT: [null, Validators.required],

    FU_ACEI: [null, Validators.required],
    FU_Warfarin: [null, Validators.required],
    FU_Aspirin: [null, Validators.required],
    FU_Vorapaxar: [null, Validators.required],
    FU_ARB: [null, Validators.required],
    FU_Apixaban: [null, Validators.required],
    FU_Dabigatran: [null, Validators.required],
    FU_Edoxaban: [null, Validators.required],
    FU_Rivaroxaban: [null, Validators.required],
    FU_Clopidogrel: [null, Validators.required],
    FU_Prasugrel: [null, Validators.required],
    FU_Ticagrelor: [null, Validators.required],
    FU_Ticlopidine: [null, Validators.required],
    FU_Statin: [null, Validators.required],
    FU_StatinDose: [null, Validators.required],
    FU_NonStatin: [null, Validators.required],
    FU_Alirocumab: [null, Validators.required],
    FU_Evolocumab: [null, Validators.required]
  }
};
