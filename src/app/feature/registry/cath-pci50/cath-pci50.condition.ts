import { FormConditions } from '../../../shared/modules/registry-form/registry-form.model';

export const conditions: FormConditions = {
  sectionA: [{ control: 'ZipCode', parentControl: 'PermAddr', conditions: ['Yes'] }],
  sectionB: [
    { control: 'TransferHospType', parentControl: 'AdmType', conditions: ['Transfer'] },
    { control: 'BDMSNetwork', parentControl: 'TransferHospType', conditions: ['BDMS Network'] },
    { control: 'NonBDMS', parentControl: 'TransferHospType', conditions: ['Non BDMS'] }
  ],
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
    { control: 'PCIProvider2', parentControl: 'PCIProc', conditions: ['Yes'] },
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
    {
      control: 'PreviousCathLabVisit',
      parentControl: 'CathLabVisitIndication',
      conditions: ['@', 'Re-CathLab Visit']
    },
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
    { control: 'NV_MeasurementType', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
    { control: 'NV_FFR', parentControl: 'NV_MeasurementType', conditions: ['@', 'FFR'] },
    { control: 'NV_FFR_Type', parentControl: 'NV_MeasurementType', conditions: ['@', 'FFR'] },
    { control: 'NV_IFR', parentControl: 'NV_MeasurementType', conditions: ['@', 'iFR'] },
    { control: 'NV_IVUS', parentControl: 'NV_MeasurementType', conditions: ['@', 'IVUS'] },
    { control: 'NV_OCT', parentControl: 'NV_MeasurementType', conditions: ['@', 'OCT'] }
  ],
  graftLesion: [
    { control: 'GraftSegmentID', parentControl: 'H:GraftStenosis', conditions: ['Yes'] },
    {
      control: 'GraftCoroVesselStenosis',
      parentControl: 'GraftSegmentID',
      conditions: ['!', null]
    },
    { control: 'CABGGraftVessel', parentControl: 'GraftSegmentID', conditions: ['!', null] },
    {
      control: 'GraftAdjuncMeasObtained',
      parentControl: 'GraftSegmentID',
      conditions: ['!', null]
    },
    {
      control: 'Graft_MeasurementType',
      parentControl: 'GraftAdjuncMeasObtained',
      conditions: ['Yes']
    },
    { control: 'Graft_FFR', parentControl: 'Graft_MeasurementType', conditions: ['@', 'FFR'] },
    { control: 'Graft_FFR_Type', parentControl: 'Graft_MeasurementType', conditions: ['@', 'FFR'] },
    { control: 'Graft_IFR', parentControl: 'Graft_MeasurementType', conditions: ['@', 'iFR'] },
    { control: 'Graft_IVUS', parentControl: 'Graft_MeasurementType', conditions: ['@', 'IVUS'] },
    { control: 'Graft_OCT', parentControl: 'Graft_MeasurementType', conditions: ['@', 'OCT'] }
  ],
  sectionI: [
    { control: 'I:sectionIBody', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'PCIStatus', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    {
      control: 'HypothermiaInducedTiming',
      parentControl: 'HypothermiaInduced',
      conditions: ['Yes']
    },
    { control: 'PCIProcedureRisk', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    {
      control: 'CHIP',
      parentControl: 'PCIProcedureRisk',
      conditions: ['Complex High Risk Indicated Procedure (CHIP)']
    },
    { control: 'PCIDecision', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'CVTxDecision', parentControl: 'PCIDecision', conditions: ['Yes'] },
    { control: 'CVSheetDecision', parentControl: 'PCIDecision', conditions: ['No'] },
    { control: 'MultiVesselDz', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'MultiVessProcType', parentControl: 'MultiVesselDz', conditions: ['Yes'] },
    { control: 'StagePCIPlanned', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'PCIIndication', parentControl: 'E:PCIProc', conditions: ['Yes'] },
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
        'Other'
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
        'Other'
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
    { control: 'PCIDelayReason', parentControl: 'PtPCIDelayReason', conditions: ['Yes'] },
    { control: 'Argatroban', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Bivalirudin', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Fondaparinux', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'HeparinDerivative', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'LMWH', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'UFH', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Warfarin', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Vorapaxar', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'GPIIbIIIa', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Apixaban', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Dabigatran', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Edoxaban', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Rivaroxaban', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Cangrelor', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Clopidogrel', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Prasugrel', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'Ticagrelor', parentControl: 'E:PCIProc', conditions: ['Yes'] }
  ],
  sectionJ: [
    { control: 'J:sectionJBody', parentControl: 'E:PCIProc', conditions: ['Yes'] },
    { control: 'PCIResult', parentControl: 'E:PCIProc', conditions: ['Yes'] }
  ],
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
    {
      control: 'BifurcationClassification',
      parentControl: 'BifurcationLesion',
      conditions: ['Yes']
    },
    { control: 'BifurcationStenting', parentControl: 'BifurcationLesion', conditions: ['Yes'] },
    {
      control: 'StentTechniqueStrategy',
      parentControl: 'BifurcationStenting',
      conditions: ['Yes']
    },
    { control: 'StentTechnique', parentControl: 'BifurcationStenting', conditions: ['Yes'] },
    { control: 'GuidewireAcross', parentControl: 'GuidewireLesion', conditions: ['Yes'] },
    { control: 'DeviceDeployed', parentControl: 'GuidewireLesion', conditions: ['Yes'] },
    { control: 'IntraCoroMeasurement', parentControl: 'DeviceDeployed', conditions: ['Yes'] },
    {
      control: 'IntraCoroMeasurementSite',
      parentControl: 'IntraCoroMeasurement',
      conditions: ['Yes']
    },
    {
      control: 'MB_MeasurementType',
      parentControl: 'IntraCoroMeasurementSite',
      conditions: ['@', 'Main branch']
    },
    { control: 'MB_FFR', parentControl: 'MB_MeasurementType', conditions: ['@', 'FFR'] },
    { control: 'MB_FFR_Type', parentControl: 'MB_MeasurementType', conditions: ['@', 'FFR'] },
    { control: 'MB_IFR', parentControl: 'MB_MeasurementType', conditions: ['@', 'iFR'] },
    { control: 'MB_IVUS_Pre', parentControl: 'MB_MeasurementType', conditions: ['@', 'IVUS'] },
    { control: 'MB_IVUS_Post', parentControl: 'MB_MeasurementType', conditions: ['@', 'IVUS'] },
    { control: 'MB_OCT_Pre', parentControl: 'MB_MeasurementType', conditions: ['@', 'OCT'] },
    { control: 'MB_OCT_Post', parentControl: 'MB_MeasurementType', conditions: ['@', 'OCT'] },
    {
      control: 'SB_MeasurementType',
      parentControl: 'IntraCoroMeasurementSite',
      conditions: ['@', 'Side branch']
    },
    { control: 'SB_FFR', parentControl: 'SB_MeasurementType', conditions: ['@', 'FFR'] },
    { control: 'SB_FFR_Type', parentControl: 'SB_MeasurementType', conditions: ['@', 'FFR'] },
    { control: 'SB_IFR', parentControl: 'SB_MeasurementType', conditions: ['@', 'iFR'] },
    { control: 'SB_IVUS_Pre', parentControl: 'SB_MeasurementType', conditions: ['@', 'IVUS'] },
    { control: 'SB_IVUS_Post', parentControl: 'SB_MeasurementType', conditions: ['@', 'IVUS'] },
    { control: 'SB_OCT_Pre', parentControl: 'SB_MeasurementType', conditions: ['@', 'OCT'] },
    { control: 'SB_OCT_Post', parentControl: 'SB_MeasurementType', conditions: ['@', 'OCT'] },
    { control: 'StentDeployed', parentControl: 'DeviceDeployed', conditions: ['Yes'] },
    { control: 'NumberStentUsed', parentControl: 'StentDeployed', conditions: ['Yes'] },
    { control: 'StentDeployedStrategy', parentControl: 'StentDeployed', conditions: ['Yes'] },
    { control: 'StenosisPostProc', parentControl: 'DeviceDeployed', conditions: ['Yes'] },
    { control: 'PostProcTIMI', parentControl: 'DeviceDeployed', conditions: ['Yes'] },
    { control: 'ProxOptimize', parentControl: 'FinalAdjBalAngioplasty', conditions: ['Yes'] },
    { control: 'FinalKissBalloon', parentControl: 'FinalAdjBalAngioplasty', conditions: ['Yes'] },
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
    {
      control: 'BurrEntrapment',
      parentControl: 'ComplicationPCIDetail',
      conditions: ['@', 'Burr Entrapment']
    },
    {
      control: 'DeviceEmbolization',
      parentControl: 'ComplicationPCIDetail',
      conditions: ['@', 'Device Embolization']
    }
  ],
  pciDevice: [],
  sectionK: [
    {
      control: 'K_BleedingAccessSiteDT',
      parentControl: 'K_BleedingAccessSite',
      conditions: ['Yes']
    },
    { control: 'K_BleedingGIDT', parentControl: 'K_BleedingGI', conditions: ['Yes'] },
    { control: 'K_BleedingGUDT', parentControl: 'K_BleedingGU', conditions: ['Yes'] },
    { control: 'K_BleedingHematomaDT', parentControl: 'K_BleedingHematoma', conditions: ['Yes'] },
    { control: 'K_BleedingOtherDT', parentControl: 'K_BleedingOther', conditions: ['Yes'] },
    { control: 'K_BleedingRetroDT', parentControl: 'K_BleedingRetro', conditions: ['Yes'] },
    { control: 'K_CardiacArrestDT', parentControl: 'K_CardiacArrest', conditions: ['Yes'] },
    { control: 'K_CardiacTamponadeDT', parentControl: 'K_CardiacTamponade', conditions: ['Yes'] },
    { control: 'K_CardiogenicShockDT', parentControl: 'K_CardiogenicShock', conditions: ['Yes'] },
    { control: 'K_HeartFailureDT', parentControl: 'K_HeartFailure', conditions: ['Yes'] },
    {
      control: 'K_MyocardialInfarctionDT',
      parentControl: 'K_MyocardialInfarction',
      conditions: ['Yes']
    },
    {
      control: 'K_MyocardialInfarctionCriteria',
      parentControl: 'K_MyocardialInfarction',
      conditions: ['Yes']
    },
    {
      control: 'K_MyocardialInfarctionFollowCriteria',
      parentControl: 'K_MyocardialInfarctionCriteria',
      conditions: ['Absolute rise in cTn (form baseline) >= 35x(URL)']
    },
    { control: 'K_NewDialysisDT', parentControl: 'K_NewDialysis', conditions: ['Yes'] },
    { control: 'K_OtherVascularDT', parentControl: 'K_OtherVascular', conditions: ['Yes'] },
    { control: 'K_StrokeHemorrhageDT', parentControl: 'K_StrokeHemorrhage', conditions: ['Yes'] },
    { control: 'K_StrokeIschemicDT', parentControl: 'K_StrokeIschemic', conditions: ['Yes'] },
    {
      control: 'K_StrokeUndeterminedDT',
      parentControl: 'K_StrokeUndetermined',
      conditions: ['Yes']
    },
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
    {
      control: 'CABGTransfer',
      parentControl: 'DCLocation',
      conditions: ['Other acute care hospital']
    },
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
    {
      control: 'DC_VorapaxarRN',
      parentControl: 'DC_Vorapaxar',
      conditions: ['No - Patient Reason']
    },
    { control: 'DC_ARBRN', parentControl: 'DC_ARB', conditions: ['No - Patient Reason'] },
    {
      control: 'DC_BetaBlockerRN',
      parentControl: 'DC_BetaBlocker',
      conditions: ['No - Patient Reason']
    },
    { control: 'DC_ApixabanRN', parentControl: 'DC_Apixaban', conditions: ['No - Patient Reason'] },
    {
      control: 'DC_DabigatranRN',
      parentControl: 'DC_Dabigatran',
      conditions: ['No - Patient Reason']
    },
    { control: 'DC_EdoxabanRN', parentControl: 'DC_Edoxaban', conditions: ['No - Patient Reason'] },
    {
      control: 'DC_RivaroxabanRN',
      parentControl: 'DC_Rivaroxaban',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'DC_ClopidogrelRN',
      parentControl: 'DC_Clopidogrel',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'DC_PrasugrelRN',
      parentControl: 'DC_Prasugrel',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'DC_TicagrelorRN',
      parentControl: 'DC_Ticagrelor',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'DC_TiclopidineRN',
      parentControl: 'DC_Ticlopidine',
      conditions: ['No - Patient Reason']
    },
    { control: 'DC_StatinDose', parentControl: 'DC_Statin', conditions: ['Yes - Prescribed'] },
    { control: 'DC_StatinRN', parentControl: 'DC_Statin', conditions: ['No - Patient Reason'] },
    {
      control: 'DC_NonStatinRN',
      parentControl: 'DC_NonStatin',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'DC_AlirocumabRN',
      parentControl: 'DC_Alirocumab',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'DC_EvolocumabRN',
      parentControl: 'DC_Evolocumab',
      conditions: ['No - Patient Reason']
    },
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
    {
      control: 'M_StrokeUndeterminedDT',
      parentControl: 'M_StrokeUndetermined',
      conditions: ['Yes']
    },
    {
      control: 'M_ThrombosisStentLesions',
      parentControl: 'M_ThrombosisStent',
      conditions: ['Yes']
    },
    { control: 'M_ThrombosisStentDT', parentControl: 'M_ThrombosisStent', conditions: ['Yes'] },
    {
      control: 'M_ThrombosisNonStentDT',
      parentControl: 'M_ThrombosisNonStent',
      conditions: ['Yes']
    },

    { control: 'FU_ACEIRN', parentControl: 'FU_ACEI', conditions: ['No - Patient Reason'] },
    { control: 'FU_WarfarinRN', parentControl: 'FU_Warfarin', conditions: ['No - Patient Reason'] },
    { control: 'FU_AspirinRN', parentControl: 'FU_Aspirin', conditions: ['No - Patient Reason'] },
    {
      control: 'FU_VorapaxarRN',
      parentControl: 'FU_Vorapaxar',
      conditions: ['No - Patient Reason']
    },
    { control: 'FU_ARBRN', parentControl: 'FU_ARB', conditions: ['No - Patient Reason'] },
    {
      control: 'FU_BetaBlockerRN',
      parentControl: 'FU_BetaBlocker',
      conditions: ['No - Patient Reason']
    },
    { control: 'FU_ApixabanRN', parentControl: 'FU_Apixaban', conditions: ['No - Patient Reason'] },
    {
      control: 'FU_DabigatranRN',
      parentControl: 'FU_Dabigatran',
      conditions: ['No - Patient Reason']
    },
    { control: 'FU_EdoxabanRN', parentControl: 'FU_Edoxaban', conditions: ['No - Patient Reason'] },
    {
      control: 'FU_RivaroxabanRN',
      parentControl: 'FU_Rivaroxaban',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'FU_ClopidogrelRN',
      parentControl: 'FU_Clopidogrel',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'FU_PrasugrelRN',
      parentControl: 'FU_Prasugrel',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'FU_TicagrelorRN',
      parentControl: 'FU_Ticagrelor',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'FU_TiclopidineRN',
      parentControl: 'FU_Ticlopidine',
      conditions: ['No - Patient Reason']
    },
    { control: 'FU_StatinRN', parentControl: 'FU_Statin', conditions: ['No - Patient Reason'] },
    {
      control: 'FU_NonStatinRN',
      parentControl: 'FU_NonStatin',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'FU_AlirocumabRN',
      parentControl: 'FU_Alirocumab',
      conditions: ['No - Patient Reason']
    },
    {
      control: 'FU_EvolocumabRN',
      parentControl: 'FU_Evolocumab',
      conditions: ['No - Patient Reason']
    },

    { control: 'FU_StatinDose', parentControl: 'FU_Statin', conditions: ['Yes - Prescribed'] }
  ]
};
