import { FormConditions } from '../../../shared/modules/registry-form/registry-form.model';

export const conditions: FormConditions = {
         sectionA: [
           { control: 'RaceAsian', parentControl: 'Race', conditions: ['Asian'] },
           { control: 'HispEthnicityType', parentControl: 'HispOrig', conditions: ['Yes'] }
         ],
         sectionB: [{ control: 'HIPS', parentControl: 'HealthIns', conditions: ['Yes'] }],
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
           { control: 'NVSegmentID', parentControl: 'NVStenosis', conditions: ['Yes'] },
           { control: 'NVCoroVesselStenosis', parentControl: 'NVSegmentID', conditions: ['!', null] },
           { control: 'NVAdjuncMeasObtained', parentControl: 'NVSegmentID', conditions: ['!', null] },
           { control: 'NV_FFR', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
           { control: 'NV_IFR', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
           { control: 'NV_IVUS', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
           { control: 'NV_OCT', parentControl: 'NVAdjuncMeasObtained', conditions: ['Yes'] },
           { control: 'GraftSegmentID', parentControl: 'GraftStenosis', conditions: ['Yes'] },
           { control: 'GraftCoroVesselStenosis', parentControl: 'GraftSegmentID', conditions: ['!', null] },
           { control: 'CABGGraftVessel', parentControl: 'GraftSegmentID', conditions: ['!', null] },
           { control: 'GraftAdjuncMeasObtained', parentControl: 'GraftSegmentID', conditions: ['!', null] },
           { control: 'Graft_FFR', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] },
           { control: 'Graft_IFR', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] },
           { control: 'Graft_IVUS', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] },
           { control: 'Graft_OCT', parentControl: 'GraftAdjuncMeasObtained', conditions: ['Yes'] }
         ],
         sectionI: [
           { control: 'HypothermiaInducedTiming', parentControl: 'HypothermiaInduced', conditions: ['Yes'] },
           { control: 'CVTxDecision', parentControl: 'PCIDecision', conditions: ['Yes'] },
           { control: 'CVSheetDecision', parentControl: 'PCIDecision', conditions: ['No'] },
           { control: 'MultiVessProcType', parentControl: 'MultiVesselDz', conditions: ['Yes'] },
           {
             control: 'SymptomDate',
             parentControl: 'PCIIndication',
             conditions: [
               'STEMI - Immediate PCI for Acute STEMI',
               'STEMI - Stable (<= 12 hrs from Sx)',
               'STEMI - Stable (> 12 hrs from Sx)',
               'STEMI - Unstable (> 12 hrs from Sx)'
             ]
           },
           { control: 'SymptomTime', parentControl: 'SymptomTimeUnk', conditions: ['Exacted'] },
           { control: 'SymptomTimeUnk', parentControl: 'SymptomDate', conditions: ['!', null] },
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
         sectionJ: [
           // LESION COUNTER 1
           { control: 'SegmentID01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'StenosisPriorTreat01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'ChronicOcclusion01', parentControl: 'StenosisPriorTreat01', conditions: [100] },
           { control: 'PreProcTIMI01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'PrevTreatedLesion01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'PrevTreatedLesionDate01', parentControl: 'PrevTreatedLesion01', conditions: ['Yes'] },
           { control: 'PreviousStent01', parentControl: 'PrevTreatedLesion01', conditions: ['Yes'] },
           { control: 'InRestenosis01', parentControl: 'PreviousStent01', conditions: ['Yes'] },
           { control: 'InThrombosis01', parentControl: 'PreviousStent01', conditions: ['Yes'] },
           { control: 'StentType01', parentControl: 'PreviousStent01', conditions: ['Yes'] },
           { control: 'LesionGraft01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'LesionGraftType01', parentControl: 'LesionGraft01', conditions: ['Yes'] },
           { control: 'LocGraft01', parentControl: 'LesionGraft01', conditions: ['Yes'] },
           { control: 'NavGraftNatLes01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'LesionComplexity01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'LesionLength01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'SevereCalcification01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'BifurcationLesion01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'GuidewireLesion01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'DeviceDeployed01', parentControl: 'GuidewireLesion01', conditions: ['Yes'] },
           { control: 'StenosisPostProc01', parentControl: 'DeviceDeployed01', conditions: ['Yes'] },
           { control: 'PostProcTIMI01', parentControl: 'DeviceDeployed01', conditions: ['Yes'] },

           // LESION COUNTER 2
           { control: 'J:lesion2', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'HasLesion02', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'SegmentID02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'StenosisPriorTreat02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'ChronicOcclusion02', parentControl: 'StenosisPriorTreat02', conditions: [100] },
           { control: 'PreProcTIMI02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'PrevTreatedLesion02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'PrevTreatedLesionDate02', parentControl: 'PrevTreatedLesion02', conditions: ['Yes'] },
           { control: 'PreviousStent02', parentControl: 'PrevTreatedLesion02', conditions: ['Yes'] },
           { control: 'InRestenosis02', parentControl: 'PreviousStent02', conditions: ['Yes'] },
           { control: 'InThrombosis02', parentControl: 'PreviousStent02', conditions: ['Yes'] },
           { control: 'StentType02', parentControl: 'PreviousStent02', conditions: ['Yes'] },
           { control: 'LesionGraft02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'LesionGraftType02', parentControl: 'LesionGraft02', conditions: ['Yes'] },
           { control: 'LocGraft02', parentControl: 'LesionGraft02', conditions: ['Yes'] },
           { control: 'NavGraftNatLes02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'LesionComplexity02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'LesionLength02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'SevereCalcification02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'BifurcationLesion02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'GuidewireLesion02', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'DeviceDeployed02', parentControl: 'GuidewireLesion02', conditions: ['Yes'] },
           { control: 'StenosisPostProc02', parentControl: 'DeviceDeployed02', conditions: ['Yes'] },
           { control: 'PostProcTIMI02', parentControl: 'DeviceDeployed02', conditions: ['Yes'] },

           // LESION COUNTER 3
           { control: 'J:lesion3', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'HasLesion03', parentControl: 'HasLesion02', conditions: ['Yes'] },
           { control: 'SegmentID03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'StenosisPriorTreat03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'ChronicOcclusion03', parentControl: 'StenosisPriorTreat03', conditions: [100] },
           { control: 'PreProcTIMI03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'PrevTreatedLesion03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'PrevTreatedLesionDate03', parentControl: 'PrevTreatedLesion03', conditions: ['Yes'] },
           { control: 'PreviousStent03', parentControl: 'PrevTreatedLesion03', conditions: ['Yes'] },
           { control: 'InRestenosis03', parentControl: 'PreviousStent03', conditions: ['Yes'] },
           { control: 'InThrombosis03', parentControl: 'PreviousStent03', conditions: ['Yes'] },
           { control: 'StentType03', parentControl: 'PreviousStent03', conditions: ['Yes'] },
           { control: 'LesionGraft03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'LesionGraftType03', parentControl: 'LesionGraft03', conditions: ['Yes'] },
           { control: 'LocGraft03', parentControl: 'LesionGraft03', conditions: ['Yes'] },
           { control: 'NavGraftNatLes03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'LesionComplexity03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'LesionLength03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'SevereCalcification03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'BifurcationLesion03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'GuidewireLesion03', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'DeviceDeployed03', parentControl: 'GuidewireLesion03', conditions: ['Yes'] },
           { control: 'StenosisPostProc03', parentControl: 'DeviceDeployed03', conditions: ['Yes'] },
           { control: 'PostProcTIMI03', parentControl: 'DeviceDeployed03', conditions: ['Yes'] },

           // LESION COUNTER 4
           { control: 'J:lesion4', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'HasLesion04', parentControl: 'HasLesion03', conditions: ['Yes'] },
           { control: 'SegmentID04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'StenosisPriorTreat04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'ChronicOcclusion04', parentControl: 'StenosisPriorTreat04', conditions: [100] },
           { control: 'PreProcTIMI04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'PrevTreatedLesion04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'PrevTreatedLesionDate04', parentControl: 'PrevTreatedLesion04', conditions: ['Yes'] },
           { control: 'PreviousStent04', parentControl: 'PrevTreatedLesion04', conditions: ['Yes'] },
           { control: 'InRestenosis04', parentControl: 'PreviousStent04', conditions: ['Yes'] },
           { control: 'InThrombosis04', parentControl: 'PreviousStent04', conditions: ['Yes'] },
           { control: 'StentType04', parentControl: 'PreviousStent04', conditions: ['Yes'] },
           { control: 'LesionGraft04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'LesionGraftType04', parentControl: 'LesionGraft04', conditions: ['Yes'] },
           { control: 'LocGraft04', parentControl: 'LesionGraft04', conditions: ['Yes'] },
           { control: 'NavGraftNatLes04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'LesionComplexity04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'LesionLength04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'SevereCalcification04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'BifurcationLesion04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'GuidewireLesion04', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'DeviceDeployed04', parentControl: 'GuidewireLesion04', conditions: ['Yes'] },
           { control: 'StenosisPostProc04', parentControl: 'DeviceDeployed04', conditions: ['Yes'] },
           { control: 'PostProcTIMI04', parentControl: 'DeviceDeployed04', conditions: ['Yes'] },

           // LESION COUNTER 5
           { control: 'J:lesion5', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'HasLesion05', parentControl: 'HasLesion04', conditions: ['Yes'] },
           { control: 'SegmentID05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'StenosisPriorTreat05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'ChronicOcclusion05', parentControl: 'StenosisPriorTreat05', conditions: [100] },
           { control: 'PreProcTIMI05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'PrevTreatedLesion05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'PrevTreatedLesionDate05', parentControl: 'PrevTreatedLesion05', conditions: ['Yes'] },
           { control: 'PreviousStent05', parentControl: 'PrevTreatedLesion05', conditions: ['Yes'] },
           { control: 'InRestenosis05', parentControl: 'PreviousStent05', conditions: ['Yes'] },
           { control: 'InThrombosis05', parentControl: 'PreviousStent05', conditions: ['Yes'] },
           { control: 'StentType05', parentControl: 'PreviousStent05', conditions: ['Yes'] },
           { control: 'LesionGraft05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'LesionGraftType05', parentControl: 'LesionGraft05', conditions: ['Yes'] },
           { control: 'LocGraft05', parentControl: 'LesionGraft05', conditions: ['Yes'] },
           { control: 'NavGraftNatLes05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'LesionComplexity05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'LesionLength05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'SevereCalcification05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'BifurcationLesion05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'GuidewireLesion05', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'DeviceDeployed05', parentControl: 'GuidewireLesion05', conditions: ['Yes'] },
           { control: 'StenosisPostProc05', parentControl: 'DeviceDeployed05', conditions: ['Yes'] },
           { control: 'PostProcTIMI05', parentControl: 'DeviceDeployed05', conditions: ['Yes'] },

           // LESION COUNTER 6
           { control: 'J:lesion6', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'HasLesion06', parentControl: 'HasLesion05', conditions: ['Yes'] },
           { control: 'SegmentID06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'StenosisPriorTreat06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'ChronicOcclusion06', parentControl: 'StenosisPriorTreat06', conditions: [100] },
           { control: 'PreProcTIMI06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'PrevTreatedLesion06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'PrevTreatedLesionDate06', parentControl: 'PrevTreatedLesion06', conditions: ['Yes'] },
           { control: 'PreviousStent06', parentControl: 'PrevTreatedLesion06', conditions: ['Yes'] },
           { control: 'InRestenosis06', parentControl: 'PreviousStent06', conditions: ['Yes'] },
           { control: 'InThrombosis06', parentControl: 'PreviousStent06', conditions: ['Yes'] },
           { control: 'StentType06', parentControl: 'PreviousStent06', conditions: ['Yes'] },
           { control: 'LesionGraft06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'LesionGraftType06', parentControl: 'LesionGraft06', conditions: ['Yes'] },
           { control: 'LocGraft06', parentControl: 'LesionGraft06', conditions: ['Yes'] },
           { control: 'NavGraftNatLes06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'LesionComplexity06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'LesionLength06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'SevereCalcification06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'BifurcationLesion06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'GuidewireLesion06', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'DeviceDeployed06', parentControl: 'GuidewireLesion06', conditions: ['Yes'] },
           { control: 'StenosisPostProc06', parentControl: 'DeviceDeployed06', conditions: ['Yes'] },
           { control: 'PostProcTIMI06', parentControl: 'DeviceDeployed06', conditions: ['Yes'] },

           // LESION COUNTER 7
           { control: 'J:lesion7', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'HasLesion07', parentControl: 'HasLesion06', conditions: ['Yes'] },
           { control: 'SegmentID07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'StenosisPriorTreat07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'ChronicOcclusion07', parentControl: 'StenosisPriorTreat07', conditions: [100] },
           { control: 'PreProcTIMI07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'PrevTreatedLesion07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'PrevTreatedLesionDate07', parentControl: 'PrevTreatedLesion07', conditions: ['Yes'] },
           { control: 'PreviousStent07', parentControl: 'PrevTreatedLesion07', conditions: ['Yes'] },
           { control: 'InRestenosis07', parentControl: 'PreviousStent07', conditions: ['Yes'] },
           { control: 'InThrombosis07', parentControl: 'PreviousStent07', conditions: ['Yes'] },
           { control: 'StentType07', parentControl: 'PreviousStent07', conditions: ['Yes'] },
           { control: 'LesionGraft07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'LesionGraftType07', parentControl: 'LesionGraft07', conditions: ['Yes'] },
           { control: 'LocGraft07', parentControl: 'LesionGraft07', conditions: ['Yes'] },
           { control: 'NavGraftNatLes07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'LesionComplexity07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'LesionLength07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'SevereCalcification07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'BifurcationLesion07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'GuidewireLesion07', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'DeviceDeployed07', parentControl: 'GuidewireLesion07', conditions: ['Yes'] },
           { control: 'StenosisPostProc07', parentControl: 'DeviceDeployed07', conditions: ['Yes'] },
           { control: 'PostProcTIMI07', parentControl: 'DeviceDeployed07', conditions: ['Yes'] },

           // LESION COUNTER 8
           { control: 'J:lesion8', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'HasLesion08', parentControl: 'HasLesion07', conditions: ['Yes'] },
           { control: 'SegmentID08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'StenosisPriorTreat08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'ChronicOcclusion08', parentControl: 'StenosisPriorTreat08', conditions: [100] },
           { control: 'PreProcTIMI08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'PrevTreatedLesion08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'PrevTreatedLesionDate08', parentControl: 'PrevTreatedLesion08', conditions: ['Yes'] },
           { control: 'PreviousStent08', parentControl: 'PrevTreatedLesion08', conditions: ['Yes'] },
           { control: 'InRestenosis08', parentControl: 'PreviousStent08', conditions: ['Yes'] },
           { control: 'InThrombosis08', parentControl: 'PreviousStent08', conditions: ['Yes'] },
           { control: 'StentType08', parentControl: 'PreviousStent08', conditions: ['Yes'] },
           { control: 'LesionGraft08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'LesionGraftType08', parentControl: 'LesionGraft08', conditions: ['Yes'] },
           { control: 'LocGraft08', parentControl: 'LesionGraft08', conditions: ['Yes'] },
           { control: 'NavGraftNatLes08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'LesionComplexity08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'LesionLength08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'SevereCalcification08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'BifurcationLesion08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'GuidewireLesion08', parentControl: 'HasLesion08', conditions: ['Yes'] },
           { control: 'DeviceDeployed08', parentControl: 'GuidewireLesion08', conditions: ['Yes'] },
           { control: 'StenosisPostProc08', parentControl: 'DeviceDeployed08', conditions: ['Yes'] },
           { control: 'PostProcTIMI08', parentControl: 'DeviceDeployed08', conditions: ['Yes'] },

           // DEVICE COUNTER 1
           { control: 'J:devicesLabel', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'J:device1', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'UseDevice01', parentControl: 'HasLesion01', conditions: ['Yes'] },
           { control: 'ICDevID01', parentControl: 'UseDevice01', conditions: ['Yes'] },
           { control: 'ICDevUDI01', parentControl: 'UseDevice01', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn01', parentControl: 'UseDevice01', conditions: ['Yes'] },
           { control: 'DeviceDiameter01', parentControl: 'UseDevice01', conditions: ['Yes'] },
           { control: 'DeviceLength01', parentControl: 'UseDevice01', conditions: ['Yes'] },

           // DEVICE COUNTER 2
           { control: 'J:device2', parentControl: 'UseDevice01', conditions: ['Yes'] },
           { control: 'UseDevice02', parentControl: 'UseDevice01', conditions: ['Yes'] },
           { control: 'ICDevID02', parentControl: 'UseDevice02', conditions: ['Yes'] },
           { control: 'ICDevUDI02', parentControl: 'UseDevice02', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn02', parentControl: 'UseDevice02', conditions: ['Yes'] },
           { control: 'DeviceDiameter02', parentControl: 'UseDevice02', conditions: ['Yes'] },
           { control: 'DeviceLength02', parentControl: 'UseDevice02', conditions: ['Yes'] },

           // DEVICE COUNTER 3
           { control: 'J:device3', parentControl: 'UseDevice02', conditions: ['Yes'] },
           { control: 'UseDevice03', parentControl: 'UseDevice02', conditions: ['Yes'] },
           { control: 'ICDevID03', parentControl: 'UseDevice03', conditions: ['Yes'] },
           { control: 'ICDevUDI03', parentControl: 'UseDevice03', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn03', parentControl: 'UseDevice03', conditions: ['Yes'] },
           { control: 'DeviceDiameter03', parentControl: 'UseDevice03', conditions: ['Yes'] },
           { control: 'DeviceLength03', parentControl: 'UseDevice03', conditions: ['Yes'] },

           // DEVICE COUNTER 4
           { control: 'J:device4', parentControl: 'UseDevice03', conditions: ['Yes'] },
           { control: 'UseDevice04', parentControl: 'UseDevice03', conditions: ['Yes'] },
           { control: 'ICDevID04', parentControl: 'UseDevice04', conditions: ['Yes'] },
           { control: 'ICDevUDI04', parentControl: 'UseDevice04', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn04', parentControl: 'UseDevice04', conditions: ['Yes'] },
           { control: 'DeviceDiameter04', parentControl: 'UseDevice04', conditions: ['Yes'] },
           { control: 'DeviceLength04', parentControl: 'UseDevice04', conditions: ['Yes'] },

           // DEVICE COUNTER 5
           { control: 'J:device5', parentControl: 'UseDevice04', conditions: ['Yes'] },
           { control: 'UseDevice05', parentControl: 'UseDevice04', conditions: ['Yes'] },
           { control: 'ICDevID05', parentControl: 'UseDevice05', conditions: ['Yes'] },
           { control: 'ICDevUDI05', parentControl: 'UseDevice05', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn05', parentControl: 'UseDevice05', conditions: ['Yes'] },
           { control: 'DeviceDiameter05', parentControl: 'UseDevice05', conditions: ['Yes'] },
           { control: 'DeviceLength05', parentControl: 'UseDevice05', conditions: ['Yes'] },

           // DEVICE COUNTER 6
           { control: 'J:device6', parentControl: 'UseDevice05', conditions: ['Yes'] },
           { control: 'UseDevice06', parentControl: 'UseDevice05', conditions: ['Yes'] },
           { control: 'ICDevID06', parentControl: 'UseDevice06', conditions: ['Yes'] },
           { control: 'ICDevUDI06', parentControl: 'UseDevice06', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn06', parentControl: 'UseDevice06', conditions: ['Yes'] },
           { control: 'DeviceDiameter06', parentControl: 'UseDevice06', conditions: ['Yes'] },
           { control: 'DeviceLength06', parentControl: 'UseDevice06', conditions: ['Yes'] },

           // DEVICE COUNTER 7
           { control: 'J:device7', parentControl: 'UseDevice06', conditions: ['Yes'] },
           { control: 'UseDevice07', parentControl: 'UseDevice06', conditions: ['Yes'] },
           { control: 'ICDevID07', parentControl: 'UseDevice07', conditions: ['Yes'] },
           { control: 'ICDevUDI07', parentControl: 'UseDevice07', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn07', parentControl: 'UseDevice07', conditions: ['Yes'] },
           { control: 'DeviceDiameter07', parentControl: 'UseDevice07', conditions: ['Yes'] },
           { control: 'DeviceLength07', parentControl: 'UseDevice07', conditions: ['Yes'] },

           // DEVICE COUNTER 8
           { control: 'J:device8', parentControl: 'UseDevice07', conditions: ['Yes'] },
           { control: 'UseDevice08', parentControl: 'UseDevice07', conditions: ['Yes'] },
           { control: 'ICDevID08', parentControl: 'UseDevice08', conditions: ['Yes'] },
           { control: 'ICDevUDI08', parentControl: 'UseDevice08', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn08', parentControl: 'UseDevice08', conditions: ['Yes'] },
           { control: 'DeviceDiameter08', parentControl: 'UseDevice08', conditions: ['Yes'] },
           { control: 'DeviceLength08', parentControl: 'UseDevice08', conditions: ['Yes'] },

           // DEVICE COUNTER 9
           { control: 'J:device9', parentControl: 'UseDevice08', conditions: ['Yes'] },
           { control: 'UseDevice09', parentControl: 'UseDevice08', conditions: ['Yes'] },
           { control: 'ICDevID09', parentControl: 'UseDevice09', conditions: ['Yes'] },
           { control: 'ICDevUDI09', parentControl: 'UseDevice09', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn09', parentControl: 'UseDevice09', conditions: ['Yes'] },
           { control: 'DeviceDiameter09', parentControl: 'UseDevice09', conditions: ['Yes'] },
           { control: 'DeviceLength09', parentControl: 'UseDevice09', conditions: ['Yes'] },

           // DEVICE COUNTER 10
           { control: 'J:device10', parentControl: 'UseDevice09', conditions: ['Yes'] },
           { control: 'UseDevice10', parentControl: 'UseDevice09', conditions: ['Yes'] },
           { control: 'ICDevID10', parentControl: 'UseDevice10', conditions: ['Yes'] },
           { control: 'ICDevUDI10', parentControl: 'UseDevice10', conditions: ['Yes'] },
           { control: 'ICDevCounterAssn10', parentControl: 'UseDevice10', conditions: ['Yes'] },
           { control: 'DeviceDiameter10', parentControl: 'UseDevice10', conditions: ['Yes'] },
           { control: 'DeviceLength10', parentControl: 'UseDevice10', conditions: ['Yes'] },

           { control: 'StentTechnique', parentControl: 'UseDevice01', conditions: ['Yes'] },
           { control: 'ProxOptimize', parentControl: 'UseDevice01', conditions: ['Yes'] },
           { control: 'FinalKissBalloon', parentControl: 'UseDevice01', conditions: ['Yes'] },
         ],
         sectionK: [
           { control: 'K:intraPCI', parentControl: 'E:PCIProc', conditions: ['Yes'] },
           { control: 'PerfSeg', parentControl: 'E:PCIProc', conditions: ['Yes'] },
           { control: 'DissectionSeg', parentControl: 'E:PCIProc', conditions: ['Yes'] },
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
           { control: 'DCCreatinine', parentControl: 'DCCreatinineDrawn', conditions: ['Yes'] },
           { control: 'DCHgb', parentControl: 'DCHgbDrawn', conditions: ['Yes'] },
           { control: 'DCLocation', parentControl: 'DCStatus', conditions: ['Alive'] },
           { control: 'CABGTransfer', parentControl: 'DCLocation', conditions: ['Other acute care hospital'] },
           {
             control: 'CABGPlannedDC',
             parentControl: 'DCLocation',
             conditions: ['Home', 'Extended care/TCU/rehab', 'Skilled Nursing facility', 'Other']
           },
           { control: 'DCHospice', parentControl: 'DCStatus', conditions: ['Alive'] },
           { control: 'DC_CardRehab', parentControl: 'DCStatus', conditions: ['Alive'] },
           { control: 'DC_LOC', parentControl: 'DCStatus', conditions: ['Deceased'] },
           { control: 'DeathProcedure', parentControl: 'DCStatus', conditions: ['Deceased'] },
           { control: 'DeathCause', parentControl: 'DCStatus', conditions: ['Deceased'] },
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
         sectionM: [
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
