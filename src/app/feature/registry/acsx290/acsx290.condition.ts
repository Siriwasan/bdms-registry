import { FormConditions } from '../registry.model';

export const conditions: FormConditions = {
         sectionA: [],
         sectionB: [],
         sectionD: [
           { control: 'DiabCtrl', parentControl: 'Diabetes', conditions: ['Yes'] },
           { control: 'InfEndTy', parentControl: 'InfEndo', conditions: ['Yes'] },
           { control: 'InfEndCult', parentControl: 'InfEndo', conditions: ['Yes'] },
           { control: 'ChrLungDType', parentControl: 'ChrLungD', conditions: ['Mild', 'Moderate', 'Severe'] },
           { control: 'FEV1', parentControl: 'PFT', conditions: ['Yes'] },
           { control: 'DLCO', parentControl: 'PFT', conditions: ['Yes'] },
           { control: 'DLCOPred', parentControl: 'DLCO', conditions: ['Yes'] },
           { control: 'PCO2', parentControl: 'ABG', conditions: ['Yes'] },
           { control: 'PO2', parentControl: 'ABG', conditions: ['Yes'] },
           { control: 'LiverChildPugh', parentControl: 'LiverDis', conditions: ['Yes'] },
           { control: 'LiverTransList', parentControl: 'LiverDis', conditions: ['Yes'] },
           { control: 'LiverStatusPost', parentControl: 'LiverDis', conditions: ['Yes'] },
           { control: 'CVA', parentControl: 'CVD', conditions: ['Yes'] },
           { control: 'CVAWhen', parentControl: 'CVA', conditions: ['Yes'] },
           { control: 'CVDTIA', parentControl: 'CVD', conditions: ['Yes'] },
           { control: 'CVDCarSten', parentControl: 'CVD', conditions: ['Yes'] },
           { control: 'CVDStenRt', parentControl: 'CVDCarSten', conditions: ['Right', 'Both'] },
           { control: 'CVDStenLft', parentControl: 'CVDCarSten', conditions: ['Left', 'Both'] },
           { control: 'CVDPCarSurg', parentControl: 'CVD', conditions: ['Yes'] },
           { control: 'FiveMWalk1', parentControl: 'FiveMWalkTest', conditions: ['Yes'] },
           { control: 'FiveMWalk2', parentControl: 'FiveMWalkTest', conditions: ['Yes'] },
           { control: 'FiveMWalk3', parentControl: 'FiveMWalkTest', conditions: ['Yes'] },
           { control: 'SixMWalkDist', parentControl: 'SixMWalkDone', conditions: ['Yes'] }
         ],
         sectionE: [
           { control: 'PrCAB', parentControl: 'PrCVInt', conditions: ['Yes'] },
           { control: 'PrValve', parentControl: 'PrCVInt', conditions: ['Yes'] },
           { control: 'PrValveProc1', parentControl: 'PrValve', conditions: ['Yes'] },
           { control: 'PrValveProc2', parentControl: 'PrValve', conditions: ['Yes'] },
           {
             control: 'PrValveProc3',
             parentControl: 'PrValveProc2',
             conditions: ['!', 'No additional valve procedure(s)']
           },
           {
             control: 'PrValveProc4',
             parentControl: 'PrValveProc3',
             conditions: ['!', 'No additional valve procedure(s)']
           },
           {
             control: 'PrValveProc5',
             parentControl: 'PrValveProc4',
             conditions: ['!', 'No additional valve procedure(s)']
           },
           { control: 'POCPCI', parentControl: 'PrCVInt', conditions: ['Yes'] },
           { control: 'POCPCIWhen', parentControl: 'POCPCI', conditions: ['Yes'] },
           {
             control: 'POCPCIndSurg',
             parentControl: 'POCPCIWhen',
             conditions: ['Yes, at this facility', 'Yes, at some other acute care facility']
           },
           { control: 'POCPCISt', parentControl: 'POCPCI', conditions: ['Yes'] },
           { control: 'POCPCIStTy', parentControl: 'POCPCISt', conditions: ['Yes'] },
           { control: 'POCPCIIn', parentControl: 'POCPCI', conditions: ['Yes'] },
           { control: 'POC', parentControl: 'PrCVInt', conditions: ['Yes'] },
           { control: 'POCInt1', parentControl: 'POC', conditions: ['Yes'] },
           { control: 'POCInt2', parentControl: 'POC', conditions: ['Yes'] },
           { control: 'POCInt3', parentControl: 'POCInt2', conditions: ['!', 'No additional interventions'] },
           { control: 'POCInt4', parentControl: 'POCInt3', conditions: ['!', 'No additional interventions'] },
           { control: 'POCInt5', parentControl: 'POCInt4', conditions: ['!', 'No additional interventions'] },
           { control: 'POCInt6', parentControl: 'POCInt5', conditions: ['!', 'No additional interventions'] },
           { control: 'POCInt7', parentControl: 'POCInt6', conditions: ['!', 'No additional interventions'] }
         ],
         sectionF: [
           { control: 'MIWhen', parentControl: 'PrevMI', conditions: ['Yes'] },
           { control: 'HeartFailTmg', parentControl: 'HeartFail', conditions: ['Yes'] },
           { control: 'HeartFailType', parentControl: 'HeartFail', conditions: ['Yes'] },
           { control: 'ClassNYH', parentControl: 'HeartFail', conditions: ['Yes'] },
           { control: 'ArrhythPPaced', parentControl: 'Arrhythmia', conditions: ['Yes'] },
           { control: 'ArrhythVV', parentControl: 'Arrhythmia', conditions: ['Yes'] },
           { control: 'ArrhythSSS', parentControl: 'Arrhythmia', conditions: ['Yes'] },
           { control: 'ArrhythAFlutter', parentControl: 'Arrhythmia', conditions: ['Yes'] },
           { control: 'ArrhythAtrFib', parentControl: 'Arrhythmia', conditions: ['Yes'] },
           {
             control: 'ArrhythAFib',
             parentControl: 'ArrhythAtrFib',
             conditions: ['Remote (> 30 days preop)', 'Recent (<= 30 days preop)']
           },
           { control: 'ArrhythSecond', parentControl: 'Arrhythmia', conditions: ['Yes'] },
           { control: 'ArrhythThird', parentControl: 'Arrhythmia', conditions: ['Yes'] }
         ],
         sectionG: [
           { control: 'MedADPIDis', parentControl: 'MedADP5Days', conditions: ['Yes'] },
           { control: 'MedASADis', parentControl: 'MedASA', conditions: ['Yes'] },
           { control: 'MedASAOnce', parentControl: 'MedASA', conditions: ['Yes'] },
           { control: 'MedACMN', parentControl: 'MedACoag', conditions: ['Yes'] },
           { control: 'MedCoum5Dis', parentControl: 'MedCoum5Days', conditions: ['Yes'] },
           { control: 'MedXa5DDis', parentControl: 'MedXa5Days', conditions: ['Yes'] },
           { control: 'MedNOACDisc', parentControl: 'MedNOAC5Days', conditions: ['Yes'] },
           { control: 'MedThromInDisc', parentControl: 'MedThromIn5Days', conditions: ['Yes'] },
           { control: 'MedLipType', parentControl: 'MedLipid', conditions: ['Yes'] }
         ],
         sectionH: [
           { control: 'CarCathDt', parentControl: 'CarCathPer', conditions: ['Yes'] },
           { control: 'Dominance', parentControl: 'CorAnatDisKnown', conditions: ['Yes'] },
           { control: 'StenSource', parentControl: 'CorAnatDisKnown', conditions: ['Yes'] },
           { control: 'NumDisV', parentControl: 'CorAnatDisKnown', conditions: ['Yes'] },
           { control: 'PctStenKnown', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
           { control: 'GraftsPrsnt', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
           { control: 'StentPrsnt', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
           { control: 'FFRPerf', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
           { control: 'IFRPerf', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },

           // cath result
           { control: 'PctStenLMain', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenLMain', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenLMain', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRLMain', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRLMain', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenProxLAD', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenProxLAD', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenProxLAD', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRProxLAD', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRProxLAD', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenMidLAD', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenMidLAD', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenMidLAD', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRMidLAD', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRMidLAD', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenDistLAD', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenDistLAD', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenDistLAD', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRDistLAD', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRDistLAD', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenDiag1', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenDiag1', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenDiag1', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRDiag1', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRDiag1', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenDiag2', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenDiag2', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenDiag2', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRDiag2', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRDiag2', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenDiag3', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenDiag3', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenDiag3', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRDiag3', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRDiag3', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenCircflx', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenCircflx', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenCircflx', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRCircflx', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRCircflx', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenOM1', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenOM1', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenOM1', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFROM1', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFROM1', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenOM2', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenOM2', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenOM2', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFROM2', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFROM2', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenOM3', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenOM3', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenOM3', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFROM3', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFROM3', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenRamus', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenRamus', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenRamus', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRRamus', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRRamus', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenRCA', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenRCA', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenRCA', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRRCA', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRRCA', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenAM', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenAM', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenAM', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRAM', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRAM', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenPDA', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenPDA', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenPDA', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRPDA', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRPDA', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'PctStenPLB', parentControl: 'PctStenKnown', conditions: ['Yes'] },
           { control: 'GrftStenPLB', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
           { control: 'StntStenPLB', parentControl: 'StentPrsnt', conditions: ['Yes'] },
           { control: 'FFRPLB', parentControl: 'FFRPerf', conditions: ['Yes'] },
           { control: 'IFRPLB', parentControl: 'IFRPerf', conditions: ['Yes'] },

           { control: 'SyntaxScr', parentControl: 'SyntaxScrKnown', conditions: ['Yes'] },
           { control: 'StrsTstRes', parentControl: 'StressTst', conditions: ['Yes'] },
           { control: 'HDEF', parentControl: 'HDEFD', conditions: ['Yes'] },
           { control: 'LVSD', parentControl: 'DimAvail', conditions: ['Yes'] },
           { control: 'LVEDD', parentControl: 'DimAvail', conditions: ['Yes'] },
           { control: 'PASYS', parentControl: 'PASYSMeas', conditions: ['Yes'] },

           // Aortic valve
           { control: 'VDAVEccJet', parentControl: 'VDInsufA', conditions: ['!', 'None'] },
           { control: 'VDStenA', parentControl: 'VDAort', conditions: ['Yes'] },
           { control: 'AoHemoDatAvail', parentControl: 'VDStenA', conditions: ['Yes'] },
           { control: 'VDAoVA', parentControl: 'AoHemoDatAvail', conditions: ['Yes'] },
           { control: 'VDGradA', parentControl: 'AoHemoDatAvail', conditions: ['Yes'] },
           { control: 'VDVMax', parentControl: 'AoHemoDatAvail', conditions: ['Yes'] },
           { control: 'VDAoPrimEt', parentControl: 'VDAort', conditions: ['Yes'] },
           { control: 'VDAoSievers', parentControl: 'VDAoPrimEt', conditions: ['Bicuspid valve disease'] },

           // Mitral valve
           { control: 'VDMVEccJet', parentControl: 'VDInsufM', conditions: ['!', 'None'] },
           { control: 'VDStenM', parentControl: 'VDMit', conditions: ['Yes'] },
           { control: 'MiHemoDatAvail', parentControl: 'VDStenM', conditions: ['Yes'] },
           { control: 'VDMVA', parentControl: 'MiHemoDatAvail', conditions: ['Yes'] },
           { control: 'VDGradM', parentControl: 'MiHemoDatAvail', conditions: ['Yes'] },
           { control: 'VDMiPrimEt', parentControl: 'VDMit', conditions: ['Yes'] },
           { control: 'VDMiPrimLes', parentControl: 'VDMit', conditions: ['Yes'] },

           // Tricuspid valve
           { control: 'VDTrAnnSize', parentControl: 'VDTrAnnMeas', conditions: ['Yes'] },
           { control: 'VDStenT', parentControl: 'VDTr', conditions: ['Yes'] },
           { control: 'VDTrPrimEt', parentControl: 'VDTr', conditions: ['Yes'] },

           // Pulmonic valve
           { control: 'RVEDDKnown', parentControl: 'VDPulm', conditions: ['Yes'] },
           { control: 'RVEDD', parentControl: 'RVEDDKnown', conditions: ['Yes'] },
           { control: 'VDStenP', parentControl: 'VDPulm', conditions: ['Yes'] },
           { control: 'PuHemoDatAvail', parentControl: 'VDStenP', conditions: ['Yes'] },
           { control: 'VDGradP', parentControl: 'PuHemoDatAvail', conditions: ['Yes'] },
           { control: 'VDPuEt', parentControl: 'VDPulm', conditions: ['Yes'] }
         ],
         sectionI: [
           {
             control: 'STSscore',
             parentControl: 'RiskDiscussed',
             conditions: [
               'Yes, STS score was calculated, discussed and documented',
               'No, STS score was available but not discussed or documented'
             ]
           },
           { control: 'UrgEmergRsn', parentControl: 'Status', conditions: ['Urgent', 'Emergent'] },

           { control: 'PCancCaseDt', parentControl: 'PCancCase', conditions: ['Yes'] },
           { control: 'PCancCaseTmg', parentControl: 'PCancCase', conditions: ['Yes'] },
           { control: 'PCancCaseRsn', parentControl: 'PCancCase', conditions: ['Yes'] },
           { control: 'PCancCaseCAB', parentControl: 'PCancCase', conditions: ['Yes'] },
           { control: 'PCancCaseMech', parentControl: 'PCancCase', conditions: ['Yes'] },
           { control: 'PCancCaseONC', parentControl: 'PCancCase', conditions: ['Yes'] },
           { control: 'PCancCaseValSur', parentControl: 'PCancCase', conditions: ['Yes'] },
           { control: 'PCancCaseValTrans', parentControl: 'PCancCase', conditions: ['Yes'] },
           { control: 'PCancCaseOC', parentControl: 'PCancCase', conditions: ['Yes'] },

           { control: 'CCancCaseTmg', parentControl: 'CCancCase', conditions: ['Yes'] },
           { control: 'CCancCaseRsn', parentControl: 'CCancCase', conditions: ['Yes'] },
           { control: 'CCancCaseCAB', parentControl: 'CCancCase', conditions: ['Yes'] },
           { control: 'CCancCaseMech', parentControl: 'CCancCase', conditions: ['Yes'] },
           { control: 'CCancCaseONC', parentControl: 'CCancCase', conditions: ['Yes'] },
           { control: 'CCancCaseValSur', parentControl: 'CCancCase', conditions: ['Yes'] },
           { control: 'CCancCaseValTrans', parentControl: 'CCancCase', conditions: ['Yes'] },
           { control: 'CCancCaseOC', parentControl: 'CCancCase', conditions: ['Yes'] },

           { control: 'RobotTim', parentControl: 'Robotic', conditions: ['Yes'] },
           { control: 'OpValSurgInput', parentControl: 'OpValve', conditions: ['Yes'] },
           { control: 'AortProcSurgInput', parentControl: 'AortProc', conditions: ['Yes'] },
           { control: 'AFibProcSurgInput', parentControl: 'AFibProc', conditions: ['Yes'] },
           { control: 'ProcSed', parentControl: 'GenAnes', conditions: ['No'] },
           { control: 'Intubate', parentControl: 'GenAnes', conditions: ['Yes'] },
           {
             control: 'IntubateDT',
             parentControl: 'Intubate',
             conditions: ['Yes, prior to entering OR for this procedure', 'Yes, in OR for this procedure']
           },
           {
             control: 'ExtubateDT',
             parentControl: 'Intubate',
             conditions: ['Yes, prior to entering OR for this procedure', 'Yes, in OR for this procedure']
           },
           { control: 'LwstTemp', parentControl: 'TempMeas', conditions: ['Yes'] },
           { control: 'LwstTempSrc', parentControl: 'TempMeas', conditions: ['Yes'] },

           { control: 'CPBCmb', parentControl: 'CPBUtil', conditions: ['Combination'] },
           { control: 'CPBCmbR', parentControl: 'CPBCmb', conditions: ['Unplanned'] },

           { control: 'CanArtStAort', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanArtStFem', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanArtStAx', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanArtStInn', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanArtStO', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },

           { control: 'CanVenStFem', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanVenStJug', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanVenStRtA', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanVenStLfA', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanVenStPulm', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanVenStBi', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'CanVenStOth', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
           { control: 'PerfusTm', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },

           { control: 'DHCATm', parentControl: 'CircArr', conditions: ['Yes'] },
           { control: 'CPerfUtil', parentControl: 'CircArr', conditions: ['Yes'] },
           { control: 'CPerfTime', parentControl: 'CPerfUtil', conditions: ['Yes'] },
           { control: 'CPerfTyp', parentControl: 'CPerfUtil', conditions: ['Yes'] },
           { control: 'TotCircArrTm', parentControl: 'CircArr', conditions: ['Yes'] },
           {
             control: 'XClampTm',
             parentControl: 'AortOccl',
             conditions: ['Aortic Crossclamp', 'Balloon Occlusion']
           },
           {
             control: 'CplegiaType',
             parentControl: 'CplegiaDeliv',
             conditions: ['Antegrade', 'Retrograde', 'Both']
           },
           { control: 'AsmtAoDxMeth', parentControl: 'AsmtAscAA', conditions: ['Yes'] },
           { control: 'AsmtAoDx', parentControl: 'AsmtAscAA', conditions: ['Yes'] },

           { control: 'IBldProd', parentControl: 'IBldProdRef', conditions: ['No'] },
           { control: 'IBdRBCU', parentControl: 'IBldProd', conditions: ['Yes'] },
           { control: 'IBdFFPU', parentControl: 'IBldProd', conditions: ['Yes'] },
           { control: 'IBdPlatU', parentControl: 'IBldProd', conditions: ['Yes'] },
           { control: 'IBdCryoU', parentControl: 'IBldProd', conditions: ['Yes'] },

           { control: 'PRepAR', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PRepAGradM', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PRepAPVL', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PRepMR', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PRepMGradM', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PRepMPVL', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PRepTR', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PRepTGradM', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PRepTPVL', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PPEFMeas', parentControl: 'InOpTEE', conditions: ['Yes'] },
           { control: 'PPEF', parentControl: 'InOpTEE', conditions: ['Yes'] }
         ],
         sectionJ: [{ control: 'NumIMADA', parentControl: 'IMAUsed', conditions: ['Yes'] }],
         sectionK: [],
         sectionL: [],
         sectionL2: [],
         sectionM: [],
         sectionM1: [],
         sectionM2: [],
         sectionM3: [],
         sectionN: [],
         sectionO: [],
         sectionP: [],
         sectionQ: [],
         sectionR: []
       };
