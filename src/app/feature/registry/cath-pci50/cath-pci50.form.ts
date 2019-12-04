import { Validators } from '@angular/forms';
import { CathPci50Validator } from './cath-pci50.validator';

export const CathPci50Form = {
  sectionA: {
    registryId: [null, Validators.required],
    HN: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    AN: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(12)]],
    LastName: [null, Validators.required],
    FirstName: [null, Validators.required],
    MidName: [null],
    SSN: [null, Validators.required],
    DOB: [
      null,
      [
        Validators.required,
        CathPci50Validator.DobStart,
        CathPci50Validator.DobBeforeArrivalDT,
        CathPci50Validator.HxMIDateAfterDob,
        CathPci50Validator.HxPCIDateAfterDob,
        CathPci50Validator.HxCABGDateAfterDob,
        CathPci50Validator.StressTestDateAfterDob,
        CathPci50Validator.CardiacCTADateAfterDob,
        CathPci50Validator.CalciumScoreDateAfterDob,
        CathPci50Validator.PriorDxAngioDateAfterDob,
        CathPci50Validator.DobBeforePrevTreatedLesionDate
      ]
    ],
    Age: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
    Sex: [null, Validators.required],
    ZipCode: [null, Validators.required],
    Race: [null, Validators.required],
    PatNation: [null, Validators.required],
    PermAddr: [null, Validators.required]
  },
  sectionB: {
    HospName: [null, Validators.required],
    AdmType: [null, Validators.required],
    TransferHospType: [null, Validators.required],
    BDMSNetwork: [null, Validators.required],
    NonBDMS: [null, Validators.required],
    PayorPrim: [null, Validators.required],
    PayorSecond: [null, Validators.required],
    ArrivalDateTime: [
      null,
      [
        Validators.required,
        CathPci50Validator.DobBeforeArrivalDT,
        CathPci50Validator.ArrivalDTBeforeDischargeDT,
        CathPci50Validator.ArrivalDTBeforeProcedureStartDT,
        CathPci50Validator.HxMIDateBeforeArrivalDT,
        CathPci50Validator.HxPCIDateBeforeArrivalDT,
        CathPci50Validator.HxCABGDateBeforeArrivalDT,
        CathPci50Validator.EDPresentDTBeforeArrivalDT,
        CathPci50Validator.CABGDateTimeAfterArrivalDT
      ]
    ],
    AdmProvider: [null, Validators.required],
    AttProvider: [null, Validators.required]
  },
  sectionC: {
    Hypertension: [null, Validators.required],
    Dyslipidemia: [null, Validators.required],
    HxMI: [null, Validators.required],
    HxMIDate: [
      null,
      [
        Validators.required,
        CathPci50Validator.HxMIDateAfterDob,
        CathPci50Validator.HxMIDateBeforeArrivalDT
      ]
    ],
    PriorPCI: [null, Validators.required],
    HxPCIDate: [
      null,
      [
        Validators.required,
        CathPci50Validator.HxPCIDateAfterDob,
        CathPci50Validator.HxPCIDateBeforeArrivalDT
      ]
    ],
    LMPCI: [null, Validators.required],
    Height: [null, [Validators.required, Validators.min(20), Validators.max(260)]],
    Weight: [null, [Validators.required, Validators.min(10), Validators.max(250)]],
    FamilyHxCAD: [null, Validators.required],
    HxCVD: [null, Validators.required],
    PriorPAD: [null, Validators.required],
    HxChronicLungDisease: [null, Validators.required],
    PriorCABG: [null, Validators.required],
    HxCABGDate: [
      null,
      [
        Validators.required,
        CathPci50Validator.HxCABGDateAfterDob,
        CathPci50Validator.HxCABGDateBeforeArrivalDT
      ]
    ],
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
    HR: [null, [Validators.required, Validators.min(20), Validators.max(300)]],
    NSVTType: [null, Validators.required],
    StressPerformed: [null, Validators.required],
    StressTestType: [null, Validators.required],
    StressTestDate: [
      null,
      [
        Validators.required,
        CathPci50Validator.StressTestDateAfterDob,
        CathPci50Validator.StressTestDateBeforeProcedureStartDT
      ]
    ],
    StressTestResult: [null, Validators.required],
    StressTestRisk: [null, Validators.required],
    CardiacCTA: [null, Validators.required],
    CardiacCTADate: [
      null,
      [
        Validators.required,
        CathPci50Validator.CardiacCTADateAfterDob,
        CathPci50Validator.CardiacCTADateBeforeProcedureStartDT
      ]
    ],
    CardiacCTAResults: [null, Validators.required],
    CalciumScoreAssessed: [null, Validators.required],
    CalciumScore: [null, [Validators.required, Validators.min(0), Validators.max(6000)]],
    CalciumScoreDate: [
      null,
      [
        Validators.required,
        CathPci50Validator.CalciumScoreDateAfterDob,
        CathPci50Validator.CalciumScoreDateBeforeProcedureStartDT
      ]
    ],
    PreProcLVEFAssessed: [null, Validators.required],
    PreProcLVEF: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
    PriorDxAngioProc: [null, Validators.required],
    PriorDxAngioDate: [
      null,
      [
        Validators.required,
        CathPci50Validator.PriorDxAngioDateAfterDob,
        CathPci50Validator.PriorDxAngioDateBeforeProcedureStartDT
      ]
    ],
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
    ProcedureStartDateTime: [
      null,
      [
        Validators.required,
        CathPci50Validator.ArrivalDTBeforeProcedureStartDT,
        CathPci50Validator.StressTestDateBeforeProcedureStartDT,
        CathPci50Validator.CardiacCTADateBeforeProcedureStartDT,
        CathPci50Validator.CalciumScoreDateBeforeProcedureStartDT,
        CathPci50Validator.PriorDxAngioDateBeforeProcedureStartDT,
        CathPci50Validator.ProcedureStartDTBeforeProcedureEndDT,
        CathPci50Validator.ProcedureStartDTBeforeDCDateTime,
        CathPci50Validator.SymptomDTBefore7ProcedureStartDT,
        CathPci50Validator.SymptomDTBeforeProcedureStartDT,
        CathPci50Validator.ThromDTBefore7ProcedureStartDT,
        CathPci50Validator.SubECGDTBefore1ProcedureStartDT,
        CathPci50Validator.EDPresentDTBeforeProcedureStartDT,
        CathPci50Validator.FirstDevActiDTAfterProcedureStartDT,
        CathPci50Validator.PrevTreatedLesionDateBeforeProcedureStartDT,
        CathPci50Validator.ProcedureStartDTBeforePrevTreatedLesionDate,
        CathPci50Validator.K_BleedingAccessSiteDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingGIDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingGUDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingHematomaDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingOtherDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingRetroDTAfterProcedureStartDT,
        CathPci50Validator.K_CardiacArrestDTAfterProcedureStartDT,
        CathPci50Validator.K_CardiacTamponadeDTAfterProcedureStartDT,
        CathPci50Validator.K_CardiogenicShockDTAfterProcedureStartDT,
        CathPci50Validator.K_HeartFailureDTAfterProcedureStartDT,
        CathPci50Validator.K_MyocardialInfarctionDTAfterProcedureStartDT,
        CathPci50Validator.K_NewDialysisDTAfterProcedureStartDT,
        CathPci50Validator.K_OtherVascularDTAfterProcedureStartDT,
        CathPci50Validator.K_StrokeHemorrhageDTAfterProcedureStartDT,
        CathPci50Validator.K_StrokeIschemicDTAfterProcedureStartDT,
        CathPci50Validator.K_StrokeUndeterminedDTAfterProcedureStartDT
      ]
    ],
    ProcedureEndDateTime: [
      null,
      [
        Validators.required,
        CathPci50Validator.ProcedureStartDTBeforeProcedureEndDT,
        CathPci50Validator.ProcedureEndDTBeforeDCDateTime
      ]
    ],
    DiagCorAngio: [null, Validators.required],
    DCathProvider: [null, Validators.required],
    PCIProc: [null, Validators.required],
    PCIProvider: [null, Validators.required],
    PCIProvider2: [null],
    LeftHeartCath: [null, Validators.required],
    PrePCILVEF: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
    PrePCILVEDP: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
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
    ProcSystolicBP: [null, [Validators.required, Validators.min(1), Validators.max(300)]],
    CAInHosp: [null, Validators.required],
    FluoroTime: [null, [Validators.required, Validators.min(0.1), Validators.max(300)]],
    ContrastVol: [null, [Validators.required, Validators.min(0), Validators.max(999)]],
    FluoroDoseKerm: [null, [Validators.required, Validators.min(1), Validators.max(50000)]],
    FluoroDoseDAP: [null, [Validators.required, Validators.min(1), Validators.max(5000000)]]
  },
  sectionF: {
    PreProcTnILab: [null, Validators.required],
    PreProcTnI: [null, [Validators.required, Validators.min(0), Validators.max(100000)]],
    PreProcTnTLab: [null, Validators.required],
    PreProcTnT: [null, [Validators.required, Validators.min(0), Validators.max(100000)]],
    PreProcCreatLab: [null, Validators.required],
    PreProcCreat: [null, [Validators.required, Validators.min(0.1), Validators.max(30.0)]],
    HGBLab: [null, Validators.required],
    HGB: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
    LipidsTCLab: [null, Validators.required],
    LipidsTC: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
    LipidsHDLLab: [null, Validators.required],
    LipidsHDL: [null, [Validators.required, Validators.min(0), Validators.max(300)]],
    PostProcTnILab: [null, Validators.required],
    PostProcTnI: [null, [Validators.required, Validators.min(0), Validators.max(100000)]],
    PostProcTnTLab: [null, Validators.required],
    PostProcTnT: [null, [Validators.required, Validators.min(0), Validators.max(100000)]],
    PostProcCreatLab: [null, Validators.required],
    PostProcCreat: [null, [Validators.required, Validators.min(0.1), Validators.max(30.0)]],
    PostProcHgbLab: [null, Validators.required],
    PostProcHgb: [null, [Validators.required, Validators.min(1), Validators.max(50)]]
  },
  sectionG: {
    CathLabVisitIndication: [null, Validators.required],
    PreviousCathLabVisit: [null, Validators.required],
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
    NVCoroVesselStenosis: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    NVAdjuncMeasObtained: [null, Validators.required],
    NV_MeasurementType: [null, Validators.required],
    NV_FFR: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    NV_FFR_Type: [null, Validators.required],
    NV_IFR: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    NV_IVUS: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    NV_OCT: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
  },
  graftLesion: {
    GraftSegmentID: [null, Validators.required],
    GraftCoroVesselStenosis: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    CABGGraftVessel: [null, Validators.required],
    GraftAdjuncMeasObtained: [null, Validators.required],
    Graft_MeasurementType: [null, Validators.required],
    Graft_FFR: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    Graft_FFR_Type: [null, Validators.required],
    Graft_IFR: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    Graft_IVUS: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    Graft_OCT: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
  },
  sectionI: {
    PCIStatus: [null, Validators.required],
    HypothermiaInduced: [null, Validators.required],
    HypothermiaInducedTiming: [null, Validators.required],
    LOCProc: [null, Validators.required],
    PCIProcedureRisk: [null, Validators.required],
    CHIP: [null, Validators.required],
    PCIDecision: [null, Validators.required],
    CVTxDecision: [null, Validators.required],
    CVSheetDecision: [null, Validators.required],
    MultiVesselDz: [null, Validators.required],
    MultiVessProcType: [null, Validators.required],
    StagePCIPlanned: [null, Validators.required],
    PCIIndication: [null, Validators.required],
    SymptomDateTime: [
      null,
      [
        Validators.required,
        CathPci50Validator.SymptomDTBefore7ProcedureStartDT,
        CathPci50Validator.SymptomDTBeforeProcedureStartDT
      ]
    ],
    SymptomOnset: [null, Validators.required],
    ThromTherapy: [null, Validators.required],
    ThromDateTime: [null, [Validators.required, CathPci50Validator.ThromDTBefore7ProcedureStartDT]],
    SyntaxScore: [null, Validators.required],
    SyntaxScoreValue: [null, Validators.required],
    StemiFirstNoted: [null, Validators.required],
    SubECGDateTime: [
      null,
      [
        Validators.required,
        CathPci50Validator.SubECGDTBefore1ProcedureStartDT,
        CathPci50Validator.EDPresentDTBeforeSubECGDT
      ]
    ],
    SubECGED: [null, Validators.required],
    PatientTransPCI: [null, Validators.required],
    EDPresentDateTime: [
      null,
      [
        Validators.required,
        CathPci50Validator.EDPresentDTBeforeArrivalDT,
        CathPci50Validator.EDPresentDTBeforeProcedureStartDT,
        CathPci50Validator.EDPresentDTBeforeSubECGDT
      ]
    ],
    FirstDevActiDateTime: [
      null,
      [Validators.required, CathPci50Validator.FirstDevActiDTAfterProcedureStartDT]
    ],
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
    PCIResult: [null, Validators.required]
  },
  pciLesion: {
    LesionCounter: [null, Validators.required],
    SegmentID: [null, Validators.required],
    CulpritArtery: [null, Validators.required],
    StenosisPriorTreat: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    ChronicOcclusion: [null, Validators.required],
    PreProcTIMI: [null, Validators.required],
    PrevTreatedLesion: [null, Validators.required],
    PrevTreatedLesionDate: [
      null,
      [
        Validators.required,
        CathPci50Validator.PrevTreatedLesionDateAfterDob,
        CathPci50Validator.PrevTreatedLesionDateBeforeProcedureStartDT
      ]
    ],
    PreviousStent: [null, Validators.required],
    InRestenosis: [null, Validators.required],
    InThrombosis: [null, Validators.required],
    StentType: [null, Validators.required],
    LesionGraft: [null, Validators.required],
    LesionGraftType: [null, Validators.required],
    LocGraft: [null, Validators.required],
    NavGraftNatLes: [null, Validators.required],
    LesionComplexity: [null, Validators.required],
    LesionLength: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    SevereCalcification: [null, Validators.required],
    BifurcationLesion: [null, Validators.required],
    BifurcationClassification: [null, Validators.required],
    BifurcationStenting: [null, Validators.required],
    StentTechniqueStrategy: [null, Validators.required],
    StentTechnique: [null, Validators.required],
    GuidewireLesion: [null, Validators.required],
    GuidewireAcross: [null, Validators.required],
    DeviceDeployed: [null, Validators.required],
    IntraCoroMeasurement: [null, Validators.required],
    IntraCoroMeasurementSite: [null, Validators.required],
    MB_MeasurementType: [null, Validators.required],
    MB_FFR: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    MB_FFR_Type: [null, Validators.required],
    MB_IFR: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    MB_IVUS_Pre: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    MB_IVUS_Post: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    MB_OCT_Pre: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    MB_OCT_Post: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    SB_MeasurementType: [null, Validators.required],
    SB_FFR: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    SB_FFR_Type: [null, Validators.required],
    SB_IFR: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    SB_IVUS_Pre: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    SB_IVUS_Post: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    SB_OCT_Pre: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    SB_OCT_Post: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    StentDeployed: [null, Validators.required],
    StentDeployedStrategy: [null, Validators.required],
    StenosisPostProc: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    PostProcTIMI: [null, Validators.required],
    FinalAdjBalAngioplasty: [null, Validators.required],
    ProxOptimize: [null, Validators.required],
    FinalKissBalloon: [null, Validators.required],
    ComplicationPCI: [null, Validators.required],
    ComplicationPCIDetail: [null, Validators.required],
    AbruptVesselClosure: [null, Validators.required],
    CoronaryArteryDissection: [null, Validators.required],
    CoronaryArteryPerforation: [null, Validators.required],
    LongitudinalStentDeformation: [null, Validators.required],
    BurrEntrapment: [null, Validators.required],
    DeviceEmbolization: [null, Validators.required],
    NumberStentUsed: [null, Validators.required]
  },
  pciDevice: {
    ICDevCounter: [null, Validators.required],
    ICDevID: [null, Validators.required],
    ICDevUDI: [null, Validators.required],
    ICDevCounterAssn: [null, Validators.required],
    DeviceDiameter: [null, [Validators.required, Validators.min(0.01), Validators.max(10.0)]],
    DeviceLength: [null, [Validators.required, Validators.min(1), Validators.max(100)]]
  },
  sectionK: {
    K_BleedingAccessSite: [null, Validators.required],
    K_BleedingAccessSiteDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_BleedingAccessSiteDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingAccessSiteDTBeforeDCDateTime
      ]
    ],
    K_BleedingGI: [null, Validators.required],
    K_BleedingGIDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_BleedingGIDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingGIDTBeforeDCDateTime
      ]
    ],
    K_BleedingGU: [null, Validators.required],
    K_BleedingGUDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_BleedingGUDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingGUDTBeforeDCDateTime
      ]
    ],
    K_BleedingHematoma: [null, Validators.required],
    K_BleedingHematomaDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_BleedingHematomaDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingHematomaDTBeforeDCDateTime
      ]
    ],
    K_BleedingOther: [null, Validators.required],
    K_BleedingOtherDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_BleedingOtherDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingOtherDTBeforeDCDateTime
      ]
    ],
    K_BleedingRetro: [null, Validators.required],
    K_BleedingRetroDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_BleedingRetroDTAfterProcedureStartDT,
        CathPci50Validator.K_BleedingRetroDTBeforeDCDateTime
      ]
    ],
    K_CardiacArrest: [null, Validators.required],
    K_CardiacArrestDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_CardiacArrestDTAfterProcedureStartDT,
        CathPci50Validator.K_CardiacArrestDTBeforeDCDateTime
      ]
    ],
    K_CardiacTamponade: [null, Validators.required],
    K_CardiacTamponadeDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_CardiacTamponadeDTAfterProcedureStartDT,
        CathPci50Validator.K_CardiacTamponadeDTBeforeDCDateTime
      ]
    ],
    K_CardiogenicShock: [null, Validators.required],
    K_CardiogenicShockDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_CardiogenicShockDTAfterProcedureStartDT,
        CathPci50Validator.K_CardiogenicShockDTBeforeDCDateTime
      ]
    ],
    K_HeartFailure: [null, Validators.required],
    K_HeartFailureDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_HeartFailureDTAfterProcedureStartDT,
        CathPci50Validator.K_HeartFailureDTBeforeDCDateTime
      ]
    ],
    K_MyocardialInfarction: [null, Validators.required],
    K_MyocardialInfarctionDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_MyocardialInfarctionDTAfterProcedureStartDT,
        CathPci50Validator.K_MyocardialInfarctionDTBeforeDCDateTime
      ]
    ],
    K_MyocardialInfarctionCriteria: [null, Validators.required],
    K_MyocardialInfarctionFollowCriteria: [null, Validators.required],
    K_NewDialysis: [null, Validators.required],
    K_NewDialysisDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_NewDialysisDTAfterProcedureStartDT,
        CathPci50Validator.K_NewDialysisDTBeforeDCDateTime
      ]
    ],
    K_OtherVascular: [null, Validators.required],
    K_OtherVascularDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_OtherVascularDTAfterProcedureStartDT,
        CathPci50Validator.K_OtherVascularDTBeforeDCDateTime
      ]
    ],
    K_StrokeHemorrhage: [null, Validators.required],
    K_StrokeHemorrhageDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_StrokeHemorrhageDTAfterProcedureStartDT,
        CathPci50Validator.K_StrokeHemorrhageDTBeforeDCDateTime
      ]
    ],
    K_StrokeIschemic: [null, Validators.required],
    K_StrokeIschemicDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_StrokeIschemicDTAfterProcedureStartDT,
        CathPci50Validator.K_StrokeIschemicDTBeforeDCDateTime
      ]
    ],
    K_StrokeUndetermined: [null, Validators.required],
    K_StrokeUndeterminedDT: [
      null,
      [
        Validators.required,
        CathPci50Validator.K_StrokeUndeterminedDTAfterProcedureStartDT,
        CathPci50Validator.K_StrokeUndeterminedDTBeforeDCDateTime
      ]
    ],
    PostTransfusion: [null, Validators.required],
    PRBCUnits: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    TransfusPostPCI: [null, Validators.required],
    TransfusionPostSurg: [null, Validators.required]
  },
  sectionL: {
    HospIntervention: [null, Validators.required],
    HospInterventionType: [null, Validators.required],
    CABGStatus: [null, Validators.required],
    CABGIndication: [null, Validators.required],
    CABGDateTime: [
      null,
      [
        Validators.required,
        CathPci50Validator.CABGDateTimeAfterArrivalDT,
        CathPci50Validator.CABGDateTimeBeforeDCDateTime
      ]
    ],
    DCDateTime: [
      null,
      [
        Validators.required,
        CathPci50Validator.ArrivalDTBeforeDischargeDT,
        CathPci50Validator.ProcedureStartDTBeforeDCDateTime,
        CathPci50Validator.ProcedureEndDTBeforeDCDateTime,
        CathPci50Validator.K_BleedingAccessSiteDTBeforeDCDateTime,
        CathPci50Validator.K_BleedingGIDTBeforeDCDateTime,
        CathPci50Validator.K_BleedingGUDTBeforeDCDateTime,
        CathPci50Validator.K_BleedingHematomaDTBeforeDCDateTime,
        CathPci50Validator.K_BleedingOtherDTBeforeDCDateTime,
        CathPci50Validator.K_BleedingRetroDTBeforeDCDateTime,
        CathPci50Validator.K_CardiacArrestDTBeforeDCDateTime,
        CathPci50Validator.K_CardiacTamponadeDTBeforeDCDateTime,
        CathPci50Validator.K_CardiogenicShockDTBeforeDCDateTime,
        CathPci50Validator.K_HeartFailureDTBeforeDCDateTime,
        CathPci50Validator.K_MyocardialInfarctionDTBeforeDCDateTime,
        CathPci50Validator.K_NewDialysisDTBeforeDCDateTime,
        CathPci50Validator.K_OtherVascularDTBeforeDCDateTime,
        CathPci50Validator.K_StrokeHemorrhageDTBeforeDCDateTime,
        CathPci50Validator.K_StrokeIschemicDTBeforeDCDateTime,
        CathPci50Validator.K_StrokeUndeterminedDTBeforeDCDateTime,
        CathPci50Validator.CABGDateTimeBeforeDCDateTime,

        CathPci50Validator.DCDateTimeBeforeIntraPostProcedureEventDT
        // CathPci50Validator.M_BleedingEventDTAfterDCDateTime,
        // CathPci50Validator.M_CABGStentDTAfterDCDateTime,
        // CathPci50Validator.M_CABGNonStentDTAfterDCDateTime,
        // CathPci50Validator.M_NSTEMIDTAfterDCDateTime,
        // CathPci50Validator.M_QwaveDTAfterDCDateTime,
        // CathPci50Validator.M_STEMIDTAfterDCDateTime,
        // CathPci50Validator.M_MIUnknownDTAfterDCDateTime,
        // CathPci50Validator.M_PCINonStentDTAfterDCDateTime,
        // CathPci50Validator.M_PCIStentDTAfterDCDateTime,
        // CathPci50Validator.M_ReadmissionDTAfterDCDateTime,
        // CathPci50Validator.M_StrokeHemorrhageDTAfterDCDateTime,
        // CathPci50Validator.M_StrokeIschemicDTAfterDCDateTime,
        // CathPci50Validator.M_StrokeUndeterminedDTAfterDCDateTime,
        // CathPci50Validator.M_ThrombosisStentDTAfterDCDateTime,
        // CathPci50Validator.M_ThrombosisNonStentDTAfterDCDateTime
      ]
    ],
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
    DC_MedReconciled: [null, Validators.required],
    L_DeviceCompositeEP: [null, Validators.required],
    L_PatientCompositeEP: [null, Validators.required],
    SubmittedDischarge: [null, Validators.required]
  },
  sectionM: {},
  followUp: {
    FU_AssessmentDate: [
      null,
      [Validators.required, CathPci50Validator.FU_AssessmentDateAfterDCDateTime]
    ],
    // RefProcStartDateTime: [null, Validators.required],
    // RefArrivalDateTime: [null, Validators.required],
    // RefDCDateTime: [null, Validators.required],
    FU_Method: [null, Validators.required],
    FU_Status: [null, Validators.required],
    FU_CPSxAssess: [null, Validators.required],
    FU_DeathDate: [null, [Validators.required, CathPci50Validator.FU_DeathDateAfterDCDateTime]],
    FU_DeathCause: [null, Validators.required],

    //  FOLLOW UP EVENTS
    M_BleedingEvent: [null, Validators.required],
    M_BleedingEventDT: [
      null,
      [Validators.required, CathPci50Validator.M_BleedingEventDTAfterDCDateTime]
    ],
    M_CABGStent: [null, Validators.required],
    M_CABGStentLesions: [null, Validators.required],
    M_CABGStentDT: [null, [Validators.required, CathPci50Validator.M_CABGStentDTAfterDCDateTime]],
    M_CABGNonStent: [null, Validators.required],
    M_CABGNonStentDT: [
      null,
      [Validators.required, CathPci50Validator.M_CABGNonStentDTAfterDCDateTime]
    ],
    M_NSTEMI: [null, Validators.required],
    M_NSTEMIDT: [null, [Validators.required, CathPci50Validator.M_NSTEMIDTAfterDCDateTime]],
    M_Qwave: [null, Validators.required],
    M_QwaveDT: [null, [Validators.required, CathPci50Validator.M_QwaveDTAfterDCDateTime]],
    M_STEMI: [null, Validators.required],
    M_STEMIDT: [null, [Validators.required, CathPci50Validator.M_STEMIDTAfterDCDateTime]],
    M_MIUnknown: [null, Validators.required],
    M_MIUnknownDT: [null, [Validators.required, CathPci50Validator.M_MIUnknownDTAfterDCDateTime]],
    M_PCINonStent: [null, Validators.required],
    M_PCINonStentDT: [
      null,
      [Validators.required, CathPci50Validator.M_PCINonStentDTAfterDCDateTime]
    ],
    M_PCIStent: [null, Validators.required],
    M_PCIStentLesions: [null, Validators.required],
    M_PCIStentDT: [null, [Validators.required, CathPci50Validator.M_PCIStentDTAfterDCDateTime]],
    M_Readmission: [null, Validators.required],
    M_ReadmissionDT: [
      null,
      [Validators.required, CathPci50Validator.M_ReadmissionDTAfterDCDateTime]
    ],
    M_StrokeHemorrhage: [null, Validators.required],
    M_StrokeHemorrhageDT: [
      null,
      [Validators.required, CathPci50Validator.M_StrokeHemorrhageDTAfterDCDateTime]
    ],
    M_StrokeIschemic: [null, Validators.required],
    M_StrokeIschemicDT: [
      null,
      [Validators.required, CathPci50Validator.M_StrokeIschemicDTAfterDCDateTime]
    ],
    M_StrokeUndetermined: [null, Validators.required],
    M_StrokeUndeterminedDT: [
      null,
      [Validators.required, CathPci50Validator.M_StrokeUndeterminedDTAfterDCDateTime]
    ],
    M_ThrombosisStent: [null, Validators.required],
    M_ThrombosisStentLesions: [null, Validators.required],
    M_ThrombosisStentDT: [
      null,
      [Validators.required, CathPci50Validator.M_ThrombosisStentDTAfterDCDateTime]
    ],
    M_ThrombosisNonStent: [null, Validators.required],
    M_ThrombosisNonStentDT: [
      null,
      [Validators.required, CathPci50Validator.M_ThrombosisNonStentDTAfterDCDateTime]
    ],

    M_DeviceCompositeEP: [null, Validators.required],
    M_PatientCompositeEP: [null, Validators.required],

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
    FU_Evolocumab: [null, Validators.required],
    SubmittedFollowUp: [null, Validators.required]
  }
};
