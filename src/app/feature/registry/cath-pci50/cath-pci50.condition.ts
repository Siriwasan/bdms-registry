import { FormConditions } from '../../../shared/modules/registry-form/registry-form.model';

export const conditions: FormConditions = {
  sectionA: [
    { control: 'RaceAsian', parentControl: 'Race', conditions: ['Asian'] },
    { control: 'HispEthnicityType', parentControl: 'HispOrig', conditions: ['Yes'] },
    { control: 'ZipCode', parentControl: 'PermAddr', conditions: ['Yes'] }
  ],
  sectionB: [],
  sectionC: [
    { control: 'HxMIDate', parentControl: 'HxMI', conditions: ['Yes'] },
    { control: 'HxPCIDate', parentControl: 'PriorPCI', conditions: ['Yes'] },
    { control: 'LMPCI', parentControl: 'PriorPCI', conditions: ['Yes'] },
    { control: 'HxCABGDate', parentControl: 'PriorCABG', conditions: ['Yes'] },
    {
      control: 'TobaccoType',
      parentControl: 'TobaccoUse',
      conditions: ['Current - Every Day', 'Current - Some Days', 'Smoker - Current status unknown']
    },
    { control: 'SmokeAmount', parentControl: 'TobaccoType', conditions: ['Cigarettes'] },
    { control: 'CAWitness', parentControl: 'CAOutHospital', conditions: ['Yes'] },
    { control: 'CAPostEMS', parentControl: 'CAOutHospital', conditions: ['Yes'] },
    { control: 'InitCARhythm', parentControl: 'CAOutHospital', conditions: ['Yes'] }
  ],
  sectionD: [
    { control: 'PriorNYHA', parentControl: 'HxHF', conditions: ['Yes'] },
    { control: 'HFNewDiag', parentControl: 'HxHF', conditions: ['Yes'] },
    { control: 'HFType', parentControl: 'HxHF', conditions: ['Yes'] },
    { control: 'ECGResults', parentControl: 'ECAssessMethod', conditions: ['!', 'None'] },
    { control: 'AntiArrhyTherapy', parentControl: 'ECGResults', conditions: ['Abnormal'] },
    { control: 'ECGFindings', parentControl: 'ECGResults', conditions: ['Abnormal'] },
    { control: 'HR', parentControl: 'ECGFindings', conditions: ['@', 'New Onset Atrial Fib'] },
    { control: 'NSVTType', parentControl: 'ECGFindings', conditions: ['@', 'Non Sustained VT'] },
    { control: 'StressTestType', parentControl: 'StressPerformed', conditions: ['Yes'] },
    { control: 'StressTestDate', parentControl: 'StressPerformed', conditions: ['Yes'] },
    { control: 'StressTestResult', parentControl: 'StressPerformed', conditions: ['Yes'] },
    { control: 'StressTestRisk', parentControl: 'StressTestResult', conditions: ['Positive'] },
    { control: 'CardiacCTADate', parentControl: 'CardiacCTA', conditions: ['Yes'] },
    { control: 'CardiacCTAResults', parentControl: 'CardiacCTA', conditions: ['Yes'] },
    { control: 'CalciumScore', parentControl: 'CalciumScoreAssessed', conditions: ['Yes'] },
    { control: 'CalciumScoreDate', parentControl: 'CalciumScoreAssessed', conditions: ['Yes'] },
    { control: 'PreProcLVEF', parentControl: 'PreProcLVEFAssessed', conditions: ['Yes'] },
    { control: 'PriorDxAngioDate', parentControl: 'PriorDxAngioProc', conditions: ['Yes'] },
    { control: 'PriorDxAngioResults', parentControl: 'PriorDxAngioProc', conditions: ['Yes'] }
  ],
  sectionE: [
    { control: 'DCathProvider', parentControl: 'DiagCorAngio', conditions: ['Yes'] },
    { control: 'PCIProvider', parentControl: 'PCIProc', conditions: ['Yes'] },
    { control: 'PrePCILVEF', parentControl: 'LeftHeartCath', conditions: ['Yes'] },
    { control: 'PrePCILVEDP', parentControl: 'LeftHeartCath', conditions: ['Yes'] },
    { control: 'ConcomProcType', parentControl: 'ConcomProc', conditions: ['Yes'] },
    { control: 'AccessSiteClosure', parentControl: 'AccessSite', conditions: ['!', null] },
    { control: 'CrossoverClosure', parentControl: 'Crossover', conditions: ['!', 'No'] },
    { control: 'SimultaneousClosure', parentControl: 'Simultaneous', conditions: ['!', 'No'] },
    { control: 'VenousAccessClosure', parentControl: 'VenousAccess', conditions: ['!', 'No'] }
  ],
  sectionF: [
    { control: 'PreProcTnI', parentControl: 'PreProcTnILab', conditions: ['Drawn'] },
    { control: 'PreProcTnT', parentControl: 'PreProcTnTLab', conditions: ['Drawn'] },
    { control: 'PreProcCreat', parentControl: 'PreProcCreatLab', conditions: ['Drawn'] },
    { control: 'HGB', parentControl: 'HGBLab', conditions: ['Drawn'] },
    { control: 'LipidsTC', parentControl: 'LipidsTCLab', conditions: ['Drawn'] },
    { control: 'LipidsHDL', parentControl: 'LipidsHDLLab', conditions: ['Drawn'] },
    { control: 'PostProcTnI', parentControl: 'PostProcTnILab', conditions: ['Drawn'] },
    { control: 'PostProcTnT', parentControl: 'PostProcTnTLab', conditions: ['Drawn'] },
    { control: 'PostProcCreat', parentControl: 'PostProcCreatLab', conditions: ['Drawn'] },
    { control: 'PostProcHgb', parentControl: 'PostProcHgbLab', conditions: ['Drawn'] }
  ],
  sectionG: [
    { control: 'CVInstabilityType', parentControl: 'CVInstability', conditions: ['Yes'] },
    { control: 'PharmVasoSupp', parentControl: 'VSupport', conditions: ['Yes'] },
    { control: 'MechVentSupp', parentControl: 'VSupport', conditions: ['Yes'] },
    { control: 'MVSupportDevice', parentControl: 'MechVentSupp', conditions: ['Yes'] },
    { control: 'MVSupportTiming', parentControl: 'MechVentSupp', conditions: ['Yes'] },
    {
      control: 'G:indicationValve',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Valvular Disease']
    },
    {
      control: 'ASSeverity',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Valvular Disease']
    },
    {
      control: 'MSSeverity',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Valvular Disease']
    },
    {
      control: 'PSSeverity',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Valvular Disease']
    },
    {
      control: 'TSSeverity',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Valvular Disease']
    },
    {
      control: 'ARSeverity',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Valvular Disease']
    },
    {
      control: 'MRSeverity',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Valvular Disease']
    },
    {
      control: 'PRSeverity',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Valvular Disease']
    },
    {
      control: 'TRSeverity',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Valvular Disease']
    },
    {
      control: 'G:indicationPreopEva',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Pre-operative evaluation']
    },
    {
      control: 'PreOPEval',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Pre-operative evaluation']
    },
    {
      control: 'FuncCapacity',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Pre-operative evaluation']
    },
    {
      control: 'SurgRisk',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Pre-operative evaluation']
    },
    {
      control: 'OrganTransplantSurg',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Pre-operative evaluation']
    },
    {
      control: 'OrganTransplantDonor',
      parentControl: 'OrganTransplantSurg',
      conditions: ['Yes']
    },
    {
      control: 'OrganTransplantType',
      parentControl: 'OrganTransplantSurg',
      conditions: ['Yes']
    }
  ],
  sectionH: [
    // { control: 'NativeLesions', parentControl: 'NVStenosis', conditions: ['Yes'] },
    // { control: 'NVSegmentID', parentControl: 'NVStenosis', conditions: ['Yes'] },
    // { control: 'NVCoroVesselStenosis', parentControl: 'NVSegmentID', conditions: ['!', null] },
    // { control: 'NVAdjuncMeasObtained', parentControl: 'NVSegmentID', conditions: ['!', null] },
    // { control: 'NV_FFR', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
    // { control: 'NV_IFR', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
    // { control: 'NV_IVUS', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
    // { control: 'NV_OCT', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
    // { control: 'GraftSegmentID', parentControl: 'GraftStenosis', conditions: ['Yes'] },
    // { control: 'GraftCoroVesselStenosis', parentControl: 'GraftSegmentID', conditions: ['!', null] },
    // { control: 'CABGGraftVessel', parentControl: 'GraftSegmentID', conditions: ['!', null] },
    // { control: 'GraftAdjuncMeasObtained', parentControl: 'GraftSegmentID', conditions: ['!', null] },
    // { control: 'Graft_FFR', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] },
    // { control: 'Graft_IFR', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] },
    // { control: 'Graft_IVUS', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] },
    // { control: 'Graft_OCT', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] }
  ],
  nativeLesion: [
    { control: 'NVSegmentID', parentControl: 'H:NVStenosis', conditions: ['Yes'] },
    { control: 'NVCoroVesselStenosis', parentControl: 'NVSegmentID', conditions: ['!', null] },
    { control: 'NVAdjuncMeasObtained', parentControl: 'NVSegmentID', conditions: ['!', null] },
    { control: 'NV_FFR', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
    { control: 'NV_IFR', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
    { control: 'NV_IVUS', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
    { control: 'NV_OCT', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] }
  ],
  graftLesion: [
    { control: 'GraftSegmentID', parentControl: 'H:GraftStenosis', conditions: ['Yes'] },
    { control: 'GraftCoroVesselStenosis', parentControl: 'GraftSegmentID', conditions: ['!', null] },
    { control: 'CABGGraftVessel', parentControl: 'GraftSegmentID', conditions: ['!', null] },
    { control: 'GraftAdjuncMeasObtained', parentControl: 'GraftSegmentID', conditions: ['!', null] },
    { control: 'Graft_FFR', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] },
    { control: 'Graft_IFR', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] },
    { control: 'Graft_IVUS', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] },
    { control: 'Graft_OCT', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] }
  ],
  sectionI: [
    { control: 'I:sectionIBody', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'HypothermiaInducedTiming', parentControl: 'HypothermiaInduced', conditions: ['Yes'] },
    { control: 'CVTxDecision', parentControl: 'PCIDecision', conditions: ['Yes'] },
    { control: 'CVSheetDecision', parentControl: 'PCIDecision', conditions: ['No'] },
    { control: 'MultiVessProcType', parentControl: 'MultiVesselDz', conditions: ['Yes'] },
    {
      control: 'SymptomDateTime',
      parentControl: 'PCIIndication',
      conditions: [
        'STEMI - Immediate PCI for Acute STEMI',
        'STEMI - Stable (<= 12 hrs from Sx)',
        'STEMI - Stable (> 12 hrs from Sx)',
        'STEMI - Unstable (> 12 hrs from Sx)'
      ]
    },
    {
      control: 'SymptomOnset',
      parentControl: 'PCIIndication',
      conditions: [
        'STEMI - Immediate PCI for Acute STEMI',
        'STEMI - Stable (<= 12 hrs from Sx)',
        'STEMI - Stable (> 12 hrs from Sx)',
        'STEMI - Unstable (> 12 hrs from Sx)'
      ]
    },
    // { control: 'SymptomDateTime', parentControl: 'SymptomOnset', conditions: ['!', null] },
    {
      control: 'ThromTherapy',
      parentControl: 'PCIIndication',
      conditions: [
        'STEMI (after successful lytics) <= 24 hrs',
        'STEMI (after successful lytics) > 24 hrs - 7 days',
        'STEMI - Rescue (After unsuccessful lytics)'
      ]
    },
    { control: 'ThromDateTime', parentControl: 'ThromTherapy', conditions: ['!', 'No'] },
    {
      control: 'SyntaxScore',
      parentControl: 'PCIIndication',
      conditions: [
        'New Onset Angina <= 2 months',
        'NSTE-ACS',
        'Stable angina',
        'CAD (without ischemic Sx)',
        'Other PCI Indication'
      ]
    },
    {
      control: 'SyntaxScoreValue',
      parentControl: 'PCIIndication',
      conditions: [
        'New Onset Angina <= 2 months',
        'NSTE-ACS',
        'Stable angina',
        'CAD (without ischemic Sx)',
        'Other PCI Indication'
      ]
    },
    {
      control: 'StemiFirstNoted',
      parentControl: 'PCIIndication',
      conditions: ['STEMI - Immediate PCI for Acute STEMI']
    },
    { control: 'SubECGDateTime', parentControl: 'StemiFirstNoted', conditions: ['Subsequent ECG'] },
    { control: 'SubECGED', parentControl: 'StemiFirstNoted', conditions: ['Subsequent ECG'] },
    {
      control: 'PatientTransPCI',
      parentControl: 'PCIIndication',
      conditions: ['STEMI - Immediate PCI for Acute STEMI']
    },
    { control: 'EDPresentDateTime', parentControl: 'PatientTransPCI', conditions: ['Yes'] },
    {
      control: 'FirstDevActiDateTime',
      parentControl: 'PCIIndication',
      conditions: ['STEMI - Immediate PCI for Acute STEMI']
    },
    {
      control: 'PtPCIDelayReason',
      parentControl: 'PCIIndication',
      conditions: ['STEMI - Immediate PCI for Acute STEMI']
    },
    { control: 'PCIDelayReason', parentControl: 'PtPCIDelayReason', conditions: ['Yes'] }
  ],
  sectionJ: [{ control: 'J:sectionJBody', parentControl: 'E:PCIProc', conditions: ['Yes'] }],
  pciLesion: [
    { control: 'ChronicOcclusion', parentControl: 'StenosisPriorTreat', conditions: [100] },
    { control: 'PrevTreatedLesionDate', parentControl: 'PrevTreatedLesion', conditions: ['Yes'] },
    { control: 'PreviousStent', parentControl: 'PrevTreatedLesion', conditions: ['Yes'] },
    { control: 'InRestenosis', parentControl: 'PreviousStent', conditions: ['Yes'] },
    { control: 'InThrombosis', parentControl: 'PreviousStent', conditions: ['Yes'] },
    { control: 'StentType', parentControl: 'PreviousStent', conditions: ['Yes'] },
    { control: 'LesionGraft', parentControl: 'H:GraftStenosis', conditions: ['Yes'] },
    { control: 'LesionGraftType', parentControl: 'LesionGraft', conditions: ['Yes'] },
    { control: 'LocGraft', parentControl: 'LesionGraft', conditions: ['Yes'] },
    { control: 'NavGraftNatLes', parentControl: 'H:GraftStenosis', conditions: ['Yes'] },
    { control: 'BifurcationClassification', parentControl: 'BifurcationLesion', conditions: ['Yes'] },
    { control: 'StentTechniqueStrategy', parentControl: 'BifurcationLesion', conditions: ['Yes'] },
    { control: 'StentTechnique', parentControl: 'BifurcationLesion', conditions: ['Yes'] },
    { control: 'GuidewireAcross', parentControl: 'GuidewireLesion', conditions: ['Yes'] },
    { control: 'DeviceDeployed', parentControl: 'GuidewireAcross', conditions: ['!', null] },
    { control: 'DeviceDeployedStrategy', parentControl: 'DeviceDeployed', conditions: ['Yes'] },
    { control: 'StenosisPostProc', parentControl: 'DeviceDeployed', conditions: ['Yes'] },
    { control: 'PostProcTIMI', parentControl: 'DeviceDeployed', conditions: ['Yes'] },
    { control: 'ComplicationPCIDetail', parentControl: 'ComplicationPCI', conditions: ['Yes'] },
    {
      control: 'AbruptVesselClosure',
      parentControl: 'ComplicationPCIDetail',
      conditions: ['@', 'Abrupt Vessel Closure']
    },
    {
      control: 'CoronaryArteryDissection',
      parentControl: 'ComplicationPCIDetail',
      conditions: ['@', 'Coronary Artery Dissection']
    },
    {
      control: 'CoronaryArteryPerforation',
      parentControl: 'ComplicationPCIDetail',
      conditions: ['@', 'Coronary Artery Perforation']
    },
    {
      control: 'LongitudinalStentDeformation',
      parentControl: 'ComplicationPCIDetail',
      conditions: ['@', 'Longitudinal Stent Deformation']
    },
    { control: 'BurrEntrapment', parentControl: 'ComplicationPCIDetail', conditions: ['@', 'Burr Entrapment'] },
    { control: 'DeviceEmbolization', parentControl: 'ComplicationPCIDetail', conditions: ['@', 'Device Embolization'] }
  ],
  pciDevice: [],
  sectionK: [
    { control: 'K_BleedingAccessSiteDT', parentControl: 'K_BleedingAccessSite', conditions: ['Yes'] },
    { control: 'K_BleedingGIDT', parentControl: 'K_BleedingGI', conditions: ['Yes'] },
    { control: 'K_BleedingGUDT', parentControl: 'K_BleedingGU', conditions: ['Yes'] },
    { control: 'K_BleedingHematomaDT', parentControl: 'K_BleedingHematoma', conditions: ['Yes'] },
    { control: 'K_BleedingOtherDT', parentControl: 'K_BleedingOther', conditions: ['Yes'] },
    { control: 'K_BleedingRetroDT', parentControl: 'K_BleedingRetro', conditions: ['Yes'] },
    { control: 'K_CardiacArrestDT', parentControl: 'K_CardiacArrest', conditions: ['Yes'] },
    { control: 'K_CardiacTamponadeDT', parentControl: 'K_CardiacTamponade', conditions: ['Yes'] },
    { control: 'K_CardiogenicShockDT', parentControl: 'K_CardiogenicShock', conditions: ['Yes'] },
    { control: 'K_HeartFailureDT', parentControl: 'K_HeartFailure', conditions: ['Yes'] },
    { control: 'K_MyocardialInfarctionDT', parentControl: 'K_MyocardialInfarction', conditions: ['Yes'] },
    { control: 'K_MyocardialInfarctionCriteria', parentControl: 'K_MyocardialInfarction', conditions: ['Yes'] },
    {
      control: 'K_MyocardialInfarctionFollowCriteria',
      parentControl: 'K_MyocardialInfarctionCriteria',
      conditions: ['Absolute rise in cTn (form baseline) >= 35x(URL)']
    },
    { control: 'K_NewDialysisDT', parentControl: 'K_NewDialysis', conditions: ['Yes'] },
    { control: 'K_OtherVascularDT', parentControl: 'K_OtherVascular', conditions: ['Yes'] },
    { control: 'K_StrokeHemorrhageDT', parentControl: 'K_StrokeHemorrhage', conditions: ['Yes'] },
    { control: 'K_StrokeIschemicDT', parentControl: 'K_StrokeIschemic', conditions: ['Yes'] },
    { control: 'K_StrokeUndeterminedDT', parentControl: 'K_StrokeUndetermined', conditions: ['Yes'] },
    { control: 'PRBCUnits', parentControl: 'PostTransfusion', conditions: ['Yes'] },
    { control: 'TransfusPostPCI', parentControl: 'PostTransfusion', conditions: ['Yes'] },
    { control: 'TransfusionPostSurg', parentControl: 'PostTransfusion', conditions: ['Yes'] }
  ],
  sectionL: [
    { control: 'HospInterventionType', parentControl: 'HospIntervention', conditions: ['Yes'] },
    { control: 'CABGStatus', parentControl: 'HospInterventionType', conditions: ['@', 'CABG'] },
    {
      control: 'CABGIndication',
      parentControl: 'HospInterventionType',
      conditions: ['@', 'CABG']
    },
    { control: 'CABGDateTime', parentControl: 'HospInterventionType', conditions: ['@', 'CABG'] },
    { control: 'DCLocation', parentControl: 'DCStatus', conditions: ['Alive'] },
    { control: 'CABGTransfer', parentControl: 'DCLocation', conditions: ['Other acute care hospital'] },
    {
      control: 'CABGPlannedDC',
      parentControl: 'DCLocation',
      conditions: ['Home', 'Extended care/TCU/rehab', 'Skilled Nursing facility', 'Other']
    },
    { control: 'DCHospice', parentControl: 'DCStatus', conditions: ['Alive'] },
    { control: 'DC_CardRehab', parentControl: 'DCStatus', conditions: ['Alive'] },
    // { control: 'DC_LOC', parentControl: 'DCStatus', conditions: ['Alive'] },
    { control: 'DeathProcedure', parentControl: 'DCStatus', conditions: ['Deceased'] },
    // { control: 'DeathCause', parentControl: 'DCStatus', conditions: ['Deceased'] },
    { control: 'DC_ACEIRN', parentControl: 'DC_ACEI', conditions: ['No - Patient Reason'] },
    { control: 'DC_WarfarinRN', parentControl: 'DC_Warfarin', conditions: ['No - Patient Reason'] },
    { control: 'DC_AspirinRN', parentControl: 'DC_Aspirin', conditions: ['No - Patient Reason'] },
    { control: 'DC_VorapaxarRN', parentControl: 'DC_Vorapaxar', conditions: ['No - Patient Reason'] },
    { control: 'DC_ARBRN', parentControl: 'DC_ARB', conditions: ['No - Patient Reason'] },
    { control: 'DC_BetaBlockerRN', parentControl: 'DC_BetaBlocker', conditions: ['No - Patient Reason'] },
    { control: 'DC_ApixabanRN', parentControl: 'DC_Apixaban', conditions: ['No - Patient Reason'] },
    { control: 'DC_DabigatranRN', parentControl: 'DC_Dabigatran', conditions: ['No - Patient Reason'] },
    { control: 'DC_EdoxabanRN', parentControl: 'DC_Edoxaban', conditions: ['No - Patient Reason'] },
    { control: 'DC_RivaroxabanRN', parentControl: 'DC_Rivaroxaban', conditions: ['No - Patient Reason'] },
    { control: 'DC_ClopidogrelRN', parentControl: 'DC_Clopidogrel', conditions: ['No - Patient Reason'] },
    { control: 'DC_PrasugrelRN', parentControl: 'DC_Prasugrel', conditions: ['No - Patient Reason'] },
    { control: 'DC_TicagrelorRN', parentControl: 'DC_Ticagrelor', conditions: ['No - Patient Reason'] },
    { control: 'DC_TiclopidineRN', parentControl: 'DC_Ticlopidine', conditions: ['No - Patient Reason'] },
    { control: 'DC_StatinDose', parentControl: 'DC_Statin', conditions: ['Yes - Prescribed'] },
    { control: 'DC_StatinRN', parentControl: 'DC_Statin', conditions: ['No - Patient Reason'] },
    { control: 'DC_NonStatinRN', parentControl: 'DC_NonStatin', conditions: ['No - Patient Reason'] },
    { control: 'DC_AlirocumabRN', parentControl: 'DC_Alirocumab', conditions: ['No - Patient Reason'] },
    { control: 'DC_EvolocumabRN', parentControl: 'DC_Evolocumab', conditions: ['No - Patient Reason'] },
    { control: 'DC_MedReconciled', parentControl: 'DC_MedReconCompleted', conditions: ['Yes'] }
  ],
  sectionM: [],
  followUp: [
    { control: 'FU_Status', parentControl: 'FU_AssessmentDate', conditions: ['!', null] },
    { control: 'FU_CPSxAssess', parentControl: 'FU_Status', conditions: ['Alive'] },
    { control: 'FU_DeathDate', parentControl: 'FU_Status', conditions: ['Deceased'] },
    { control: 'FU_DeathCause', parentControl: 'FU_Status', conditions: ['Deceased'] },

    { control: 'M_BleedingEventDT', parentControl: 'M_BleedingEvent', conditions: ['Yes'] },
    { control: 'M_CABGStentLesions', parentControl: 'M_CABGStent', conditions: ['Yes'] },
    { control: 'M_CABGStentDT', parentControl: 'M_CABGStent', conditions: ['Yes'] },
    { control: 'M_CABGNonStentDT', parentControl: 'M_CABGNonStent', conditions: ['Yes'] },
    { control: 'M_NSTEMIDT', parentControl: 'M_NSTEMI', conditions: ['Yes'] },
    { control: 'M_QwaveDT', parentControl: 'M_Qwave', conditions: ['Yes'] },
    { control: 'M_STEMIDT', parentControl: 'M_STEMI', conditions: ['Yes'] },
    { control: 'M_MIUnknownDT', parentControl: 'M_MIUnknown', conditions: ['Yes'] },
    { control: 'M_PCINonStentDT', parentControl: 'M_PCINonStent', conditions: ['Yes'] },
    { control: 'M_PCIStentLesions', parentControl: 'M_PCIStent', conditions: ['Yes'] },
    { control: 'M_PCIStentDT', parentControl: 'M_PCIStent', conditions: ['Yes'] },
    { control: 'M_ReadmissionDT', parentControl: 'M_Readmission', conditions: ['Yes'] },
    { control: 'M_StrokeHemorrhageDT', parentControl: 'M_StrokeHemorrhage', conditions: ['Yes'] },
    { control: 'M_StrokeIschemicDT', parentControl: 'M_StrokeIschemic', conditions: ['Yes'] },
    { control: 'M_StrokeUndeterminedDT', parentControl: 'M_StrokeUndetermined', conditions: ['Yes'] },
    { control: 'M_ThrombosisStentLesions', parentControl: 'M_ThrombosisStent', conditions: ['Yes'] },
    { control: 'M_ThrombosisStentDT', parentControl: 'M_ThrombosisStent', conditions: ['Yes'] },
    { control: 'M_ThrombosisNonStentDT', parentControl: 'M_ThrombosisNonStent', conditions: ['Yes'] },

    { control: 'FU_StatinDose', parentControl: 'FU_Statin', conditions: ['Yes - Prescribed'] }
  ]
};
