import { FormConditions } from '../../../shared/modules/registry-form/registry-form.model';

export const conditions: FormConditions = {
  sectionA: [],
  sectionB: [],
  sectionC: [
    {
      control: 'OthHosCS',
      parentControl: 'AdmitSrc',
      conditions: ['Transfer in from another hospital/acute care facility']
    }
  ],
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
    { control: 'H:coronary', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenKnown', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'GraftsPrsnt', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'StentPrsnt', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'FFRPerf', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'IFRPerf', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },

    // cath result
    { control: 'H:cathresult0', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenLMain', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenLMain', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenLMain', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRLMain', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRLMain', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult1', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenProxLAD', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenProxLAD', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenProxLAD', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRProxLAD', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRProxLAD', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult2', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenMidLAD', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenMidLAD', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenMidLAD', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRMidLAD', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRMidLAD', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult3', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenDistLAD', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenDistLAD', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenDistLAD', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRDistLAD', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRDistLAD', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult4', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenDiag1', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenDiag1', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenDiag1', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRDiag1', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRDiag1', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult5', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenDiag2', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenDiag2', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenDiag2', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRDiag2', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRDiag2', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult6', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenDiag3', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenDiag3', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenDiag3', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRDiag3', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRDiag3', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult7', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenCircflx', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenCircflx', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenCircflx', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRCircflx', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRCircflx', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult8', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenOM1', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenOM1', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenOM1', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFROM1', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFROM1', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult9', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenOM2', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenOM2', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenOM2', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFROM2', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFROM2', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult10', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenOM3', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenOM3', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenOM3', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFROM3', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFROM3', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult11', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenRamus', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenRamus', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenRamus', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRRamus', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRRamus', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult12', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenRCA', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenRCA', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenRCA', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRRCA', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRRCA', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult13', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenAM', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenAM', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenAM', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRAM', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRAM', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult14', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
    { control: 'PctStenPDA', parentControl: 'PctStenKnown', conditions: ['Yes'] },
    { control: 'GrftStenPDA', parentControl: 'GraftsPrsnt', conditions: ['Yes'] },
    { control: 'StntStenPDA', parentControl: 'StentPrsnt', conditions: ['Yes'] },
    { control: 'FFRPDA', parentControl: 'FFRPerf', conditions: ['Yes'] },
    { control: 'IFRPDA', parentControl: 'IFRPerf', conditions: ['Yes'] },

    { control: 'H:cathresult15', parentControl: 'NumDisV', conditions: ['One', 'Two', 'Three'] },
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
    {
      control: 'EUROscore',
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
    { control: 'I:planPreProd', parentControl: 'PCancCase', conditions: ['Yes'] },
    { control: 'PCancCaseCAB', parentControl: 'PCancCase', conditions: ['Yes'] },
    { control: 'PCancCaseMech', parentControl: 'PCancCase', conditions: ['Yes'] },
    { control: 'PCancCaseONC', parentControl: 'PCancCase', conditions: ['Yes'] },
    { control: 'PCancCaseValSur', parentControl: 'PCancCase', conditions: ['Yes'] },
    { control: 'PCancCaseValTrans', parentControl: 'PCancCase', conditions: ['Yes'] },
    { control: 'PCancCaseOC', parentControl: 'PCancCase', conditions: ['Yes'] },

    { control: 'CCancCaseTmg', parentControl: 'CCancCase', conditions: ['Yes'] },
    { control: 'CCancCaseRsn', parentControl: 'CCancCase', conditions: ['Yes'] },
    { control: 'I:planProd', parentControl: 'CCancCase', conditions: ['Yes'] },
    { control: 'CCancCaseCAB', parentControl: 'CCancCase', conditions: ['Yes'] },
    { control: 'CCancCaseMech', parentControl: 'CCancCase', conditions: ['Yes'] },
    { control: 'CCancCaseONC', parentControl: 'CCancCase', conditions: ['Yes'] },
    { control: 'CCancCaseValSur', parentControl: 'CCancCase', conditions: ['Yes'] },
    { control: 'CCancCaseValTrans', parentControl: 'CCancCase', conditions: ['Yes'] },
    { control: 'CCancCaseOC', parentControl: 'CCancCase', conditions: ['Yes'] },

    { control: 'RobotTim', parentControl: 'Robotic', conditions: ['Yes'] },
    { control: 'OpValSurgInput', parentControl: 'OpValve', conditions: ['Yes'] },
    { control: 'AortProcSurgInput', parentControl: 'AortProc', conditions: ['!', 'No'] },
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

    { control: 'I:artCannSite', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
    { control: 'CanArtStAort', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
    { control: 'CanArtStFem', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
    { control: 'CanArtStAx', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
    { control: 'CanArtStInn', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
    { control: 'CanArtStOth', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },

    { control: 'I:venCannSite', parentControl: 'CPBUtil', conditions: ['Combination', 'Full'] },
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
    { control: 'PPEF', parentControl: 'PPEFMeas', conditions: ['Yes'] }
  ],
  sectionJ: [
    { control: 'J:sectionJBody', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'IMAUsed', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'NoIMARsn', parentControl: 'IMAUsed', conditions: ['No'] },
    { control: 'NumIMADA', parentControl: 'IMAUsed', conditions: ['Yes'] },
    { control: 'LeftIMA', parentControl: 'IMAUsed', conditions: ['Yes'] },
    {
      control: 'LIMAHarvTech',
      parentControl: 'LeftIMA',
      conditions: ['Yes, pedicle', 'Yes, skeletonized']
    },
    { control: 'RightIMA', parentControl: 'IMAUsed', conditions: ['Yes'] },
    {
      control: 'RIMAHarvTech',
      parentControl: 'RightIMA',
      conditions: ['Yes, pedicle', 'Yes, skeletonized']
    },
    { control: 'RadialArtUsed', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'NumRadDA', parentControl: 'RadialArtUsed', conditions: ['Yes'] },
    { control: 'RadHTech', parentControl: 'RadialArtUsed', conditions: ['Yes'] },
    { control: 'RadHarvPrepTm', parentControl: 'RadialArtUsed', conditions: ['Yes'] },
    { control: 'VenousCondUsed', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'DistVein', parentControl: 'VenousCondUsed', conditions: ['Yes'] },
    { control: 'DistVeinHTech', parentControl: 'VenousCondUsed', conditions: ['Yes'] },
    { control: 'SaphHarPrepTm', parentControl: 'VenousCondUsed', conditions: ['Yes'] },
    { control: 'J:numDistAnas', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'NumOArtD', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'NumArtVenComp', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'NumVenArtComp', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'NumArtArtComp', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'ProxTech', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },

    { control: 'J:cabg1', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'CAB01', parentControl: 'I:OpCAB', conditions: ['!', 'No'] },
    { control: 'CABDistSite01', parentControl: 'CAB01', conditions: ['Yes'] },
    { control: 'CABProximalSite01', parentControl: 'CAB01', conditions: ['Yes'] },
    { control: 'CABConduit01', parentControl: 'CAB01', conditions: ['Yes'] },
    { control: 'CABDistPos01', parentControl: 'CAB01', conditions: ['Yes'] },
    { control: 'CABEndArt01', parentControl: 'CAB01', conditions: ['Yes'] },
    { control: 'CABVeinPatAng01', parentControl: 'CAB01', conditions: ['Yes'] },

    { control: 'J:cabg2', parentControl: 'CAB01', conditions: ['Yes'] },
    { control: 'CAB02', parentControl: 'CAB01', conditions: ['Yes'] },
    { control: 'CABDistSite02', parentControl: 'CAB02', conditions: ['Yes'] },
    { control: 'CABProximalSite02', parentControl: 'CAB02', conditions: ['Yes'] },
    { control: 'CABConduit02', parentControl: 'CAB02', conditions: ['Yes'] },
    { control: 'CABDistPos02', parentControl: 'CAB02', conditions: ['Yes'] },
    { control: 'CABEndArt02', parentControl: 'CAB02', conditions: ['Yes'] },
    { control: 'CABVeinPatAng02', parentControl: 'CAB02', conditions: ['Yes'] },

    { control: 'J:cabg3', parentControl: 'CAB02', conditions: ['Yes'] },
    { control: 'CAB03', parentControl: 'CAB02', conditions: ['Yes'] },
    { control: 'CABDistSite03', parentControl: 'CAB03', conditions: ['Yes'] },
    { control: 'CABProximalSite03', parentControl: 'CAB03', conditions: ['Yes'] },
    { control: 'CABConduit03', parentControl: 'CAB03', conditions: ['Yes'] },
    { control: 'CABDistPos03', parentControl: 'CAB03', conditions: ['Yes'] },
    { control: 'CABEndArt03', parentControl: 'CAB03', conditions: ['Yes'] },
    { control: 'CABVeinPatAng03', parentControl: 'CAB03', conditions: ['Yes'] },

    { control: 'J:cabg4', parentControl: 'CAB03', conditions: ['Yes'] },
    { control: 'CAB04', parentControl: 'CAB03', conditions: ['Yes'] },
    { control: 'CABDistSite04', parentControl: 'CAB04', conditions: ['Yes'] },
    { control: 'CABProximalSite04', parentControl: 'CAB04', conditions: ['Yes'] },
    { control: 'CABConduit04', parentControl: 'CAB04', conditions: ['Yes'] },
    { control: 'CABDistPos04', parentControl: 'CAB04', conditions: ['Yes'] },
    { control: 'CABEndArt04', parentControl: 'CAB04', conditions: ['Yes'] },
    { control: 'CABVeinPatAng04', parentControl: 'CAB04', conditions: ['Yes'] },

    { control: 'J:cabg5', parentControl: 'CAB04', conditions: ['Yes'] },
    { control: 'CAB05', parentControl: 'CAB04', conditions: ['Yes'] },
    { control: 'CABDistSite05', parentControl: 'CAB05', conditions: ['Yes'] },
    { control: 'CABProximalSite05', parentControl: 'CAB05', conditions: ['Yes'] },
    { control: 'CABConduit05', parentControl: 'CAB05', conditions: ['Yes'] },
    { control: 'CABDistPos05', parentControl: 'CAB05', conditions: ['Yes'] },
    { control: 'CABEndArt05', parentControl: 'CAB05', conditions: ['Yes'] },
    { control: 'CABVeinPatAng05', parentControl: 'CAB05', conditions: ['Yes'] },

    { control: 'J:cabg6', parentControl: 'CAB05', conditions: ['Yes'] },
    { control: 'CAB06', parentControl: 'CAB05', conditions: ['Yes'] },
    { control: 'CABDistSite06', parentControl: 'CAB06', conditions: ['Yes'] },
    { control: 'CABProximalSite06', parentControl: 'CAB06', conditions: ['Yes'] },
    { control: 'CABConduit06', parentControl: 'CAB06', conditions: ['Yes'] },
    { control: 'CABDistPos06', parentControl: 'CAB06', conditions: ['Yes'] },
    { control: 'CABEndArt06', parentControl: 'CAB06', conditions: ['Yes'] },
    { control: 'CABVeinPatAng06', parentControl: 'CAB06', conditions: ['Yes'] },

    { control: 'J:cabg7', parentControl: 'CAB06', conditions: ['Yes'] },
    { control: 'CAB07', parentControl: 'CAB06', conditions: ['Yes'] },
    { control: 'CABDistSite07', parentControl: 'CAB07', conditions: ['Yes'] },
    { control: 'CABProximalSite07', parentControl: 'CAB07', conditions: ['Yes'] },
    { control: 'CABConduit07', parentControl: 'CAB07', conditions: ['Yes'] },
    { control: 'CABDistPos07', parentControl: 'CAB07', conditions: ['Yes'] },
    { control: 'CABEndArt07', parentControl: 'CAB07', conditions: ['Yes'] },
    { control: 'CABVeinPatAng07', parentControl: 'CAB07', conditions: ['Yes'] },

    { control: 'J:cabg8', parentControl: 'CAB07', conditions: ['Yes'] },
    { control: 'CAB08', parentControl: 'CAB07', conditions: ['Yes'] },
    { control: 'CABDistSite08', parentControl: 'CAB08', conditions: ['Yes'] },
    { control: 'CABProximalSite08', parentControl: 'CAB08', conditions: ['Yes'] },
    { control: 'CABConduit08', parentControl: 'CAB08', conditions: ['Yes'] },
    { control: 'CABDistPos08', parentControl: 'CAB08', conditions: ['Yes'] },
    { control: 'CABEndArt08', parentControl: 'CAB08', conditions: ['Yes'] },
    { control: 'CABVeinPatAng08', parentControl: 'CAB08', conditions: ['Yes'] },

    { control: 'J:cabg9', parentControl: 'CAB08', conditions: ['Yes'] },
    { control: 'CAB09', parentControl: 'CAB08', conditions: ['Yes'] },
    { control: 'CABDistSite09', parentControl: 'CAB09', conditions: ['Yes'] },
    { control: 'CABProximalSite09', parentControl: 'CAB09', conditions: ['Yes'] },
    { control: 'CABConduit09', parentControl: 'CAB09', conditions: ['Yes'] },
    { control: 'CABDistPos09', parentControl: 'CAB09', conditions: ['Yes'] },
    { control: 'CABEndArt09', parentControl: 'CAB09', conditions: ['Yes'] },
    { control: 'CABVeinPatAng09', parentControl: 'CAB09', conditions: ['Yes'] },

    { control: 'J:cabg10', parentControl: 'CAB09', conditions: ['Yes'] },
    { control: 'CAB10', parentControl: 'CAB09', conditions: ['Yes'] },
    { control: 'CABDistSite10', parentControl: 'CAB10', conditions: ['Yes'] },
    { control: 'CABProximalSite10', parentControl: 'CAB10', conditions: ['Yes'] },
    { control: 'CABConduit10', parentControl: 'CAB10', conditions: ['Yes'] },
    { control: 'CABDistPos10', parentControl: 'CAB10', conditions: ['Yes'] },
    { control: 'CABEndArt10', parentControl: 'CAB10', conditions: ['Yes'] },
    { control: 'CABVeinPatAng10', parentControl: 'CAB10', conditions: ['Yes'] }
  ],
  sectionK: [
    { control: 'K:sectionKBody', parentControl: 'I:OpValve', conditions: ['Yes'] },
    { control: 'ValExp', parentControl: 'I:OpValve', conditions: ['Yes'] },
    { control: 'ValExpPos', parentControl: 'ValExp', conditions: ['Yes'] },
    { control: 'ValExpTyp', parentControl: 'ValExp', conditions: ['Yes'] },
    { control: 'ValExpEt', parentControl: 'ValExp', conditions: ['Yes'] },
    { control: 'ValExpDevKnown', parentControl: 'ValExp', conditions: ['Yes'] },
    { control: 'ValExpDev', parentControl: 'ValExpDevKnown', conditions: ['Yes'] },
    { control: 'ValExpUDI', parentControl: 'ValExpDevKnown', conditions: ['Yes'] },
    { control: 'ValExp2', parentControl: 'ValExp', conditions: ['Yes'] },
    { control: 'ValExpPos2', parentControl: 'ValExp2', conditions: ['Yes'] },
    { control: 'ValExpTyp2', parentControl: 'ValExp2', conditions: ['Yes'] },
    { control: 'ValExpEt2', parentControl: 'ValExp2', conditions: ['Yes'] },
    { control: 'ValExpDevKnown2', parentControl: 'ValExp2', conditions: ['Yes'] },
    { control: 'ValExpDev2', parentControl: 'ValExpDevKnown2', conditions: ['Yes'] },
    { control: 'ValExpUDI2', parentControl: 'ValExpDevKnown2', conditions: ['Yes'] },

    // AORTIC VALVE
    { control: 'VSAV', parentControl: 'I:OpValve', conditions: ['Yes'] },
    { control: 'VSAVPr', parentControl: 'VSAV', conditions: ['!', 'No'] },
    { control: 'VSTCV', parentControl: 'VSAVPr', conditions: ['Replacement'] },
    { control: 'VSTCVR', parentControl: 'VSTCV', conditions: ['Yes'] },
    { control: 'VSAVSurgRep', parentControl: 'VSAVPr', conditions: ['Replacement'] },
    { control: 'VSAVSurgType', parentControl: 'VSAVSurgRep', conditions: ['Yes'] },
    { control: 'VSAVSurgBioT', parentControl: 'VSAVSurgType', conditions: ['Bioprosthetic'] },

    { control: 'VSAVRComA', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRExSutAn', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRLPlic', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRNodRel', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRPTFE', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRComRS', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRRaphe', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRRingA', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRRingATy', parentControl: 'VSAVRRingA', conditions: ['Yes'] },
    { control: 'VSAVRLResect', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRLeafShav', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRLPPatch', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRDeb', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'VSAVRPeriLeak', parentControl: 'VSAVPr', conditions: ['Repair/Reconstruction'] },
    { control: 'AnlrEnl', parentControl: 'VSAV', conditions: ['!', 'No'] },
    { control: 'AnlrEnlTech', parentControl: 'AnlrEnl', conditions: ['Yes'] },
    { control: 'VSAVRoot', parentControl: 'VSAV', conditions: ['!', 'No'] },
    { control: 'VSAVRootOReimp', parentControl: 'VSAVRoot', conditions: ['Yes'] },
    { control: 'VSAVRootOReimpTy', parentControl: 'VSAVRootOReimp', conditions: ['Yes'] },
    { control: 'VSAVRepBioTy', parentControl: 'VSAVRootOReimpTy', conditions: ['Bioprosthetic'] },
    { control: 'VSAVSparRt', parentControl: 'VSAVRoot', conditions: ['Yes'] },
    { control: 'VSAVSparRtOp', parentControl: 'VSAVSparRt', conditions: ['Yes'] },
    { control: 'VSAVRootRecon', parentControl: 'VSAVRoot', conditions: ['Yes'] },
    { control: 'VSAVPat', parentControl: 'VSAV', conditions: ['!', 'No'] },
    { control: 'VSAVPatTy', parentControl: 'VSAVPat', conditions: ['Yes'] },
    { control: 'AorticImplant', parentControl: 'VSAV', conditions: ['!', 'No'] },
    { control: 'VSAoIm', parentControl: 'AorticImplant', conditions: ['Yes'] },
    { control: 'VSAoImSz', parentControl: 'AorticImplant', conditions: ['Yes'] },
    { control: 'VSAoImUDI', parentControl: 'AorticImplant', conditions: ['Yes'] },

    // MITRAL VALVE
    { control: 'VSMV', parentControl: 'I:OpValve', conditions: ['Yes'] },
    { control: 'VSMVPr', parentControl: 'VSMV', conditions: ['!', 'No'] },
    { control: 'VSMVRepApp', parentControl: 'VSMVPr', conditions: ['Repair'] },
    { control: 'VSMitRAnnulo', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },

    //  LEAFLET RESECTION
    { control: 'VSMitRLeafRes', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'VSLeafResTyp', parentControl: 'VSMitRLeafRes', conditions: ['Yes'] },
    { control: 'K:resectLoc', parentControl: 'VSMitRLeafRes', conditions: ['Yes'] },
    { control: 'VSLeafAntRes', parentControl: 'VSMitRLeafRes', conditions: ['Yes'] },
    { control: 'VSLeafAntResLocD', parentControl: 'VSLeafAntRes', conditions: ['Yes'] },
    { control: 'K:antLeafRect', parentControl: 'VSLeafAntResLocD', conditions: ['Yes'] },
    { control: 'VSLeafAntResA1', parentControl: 'VSLeafAntResLocD', conditions: ['Yes'] },
    { control: 'VSLeafAntResA2', parentControl: 'VSLeafAntResLocD', conditions: ['Yes'] },
    { control: 'VSLeafAntResA3', parentControl: 'VSLeafAntResLocD', conditions: ['Yes'] },
    { control: 'VSLeafPostRes', parentControl: 'VSMitRLeafRes', conditions: ['Yes'] },
    { control: 'VSLeafPostResLocD', parentControl: 'VSLeafPostRes', conditions: ['Yes'] },
    { control: 'K:postLeafRect', parentControl: 'VSLeafPostResLocD', conditions: ['Yes'] },
    { control: 'VSLeafPostResP1', parentControl: 'VSLeafPostResLocD', conditions: ['Yes'] },
    { control: 'VSLeafPostResP2', parentControl: 'VSLeafPostResLocD', conditions: ['Yes'] },
    { control: 'VSLeafPostResP3', parentControl: 'VSLeafPostResLocD', conditions: ['Yes'] },
    { control: 'VSLeafComRes', parentControl: 'VSMitRLeafRes', conditions: ['Yes'] },
    { control: 'VSLeafComResLoc', parentControl: 'VSLeafComRes', conditions: ['Yes'] },

    //  NEOCORDS (PTFE)
    { control: 'VSMitRPTFE', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'K:neoLoc', parentControl: 'VSMitRPTFE', conditions: ['Yes'] },
    { control: 'VSNeoAnt', parentControl: 'VSMitRPTFE', conditions: ['Yes'] },
    { control: 'VSNeoAntLocD', parentControl: 'VSNeoAnt', conditions: ['Yes'] },
    { control: 'K:antNeoLoc', parentControl: 'VSNeoAntLocD', conditions: ['Yes'] },
    { control: 'VSNeoAntA1', parentControl: 'VSNeoAntLocD', conditions: ['Yes'] },
    { control: 'VSNeoAntA2', parentControl: 'VSNeoAntLocD', conditions: ['Yes'] },
    { control: 'VSNeoAntA3', parentControl: 'VSNeoAntLocD', conditions: ['Yes'] },
    { control: 'VSNeoPost', parentControl: 'VSMitRPTFE', conditions: ['Yes'] },
    { control: 'VSNeoPostLocD', parentControl: 'VSNeoPost', conditions: ['Yes'] },
    { control: 'K:postNeoLoc', parentControl: 'VSNeoPostLocD', conditions: ['Yes'] },
    { control: 'VSNeoPostP1', parentControl: 'VSNeoPostLocD', conditions: ['Yes'] },
    { control: 'VSNeoPostP2', parentControl: 'VSNeoPostLocD', conditions: ['Yes'] },
    { control: 'VSNeoPostP3', parentControl: 'VSNeoPostLocD', conditions: ['Yes'] },
    { control: 'VSNeoCom', parentControl: 'VSMitRPTFE', conditions: ['Yes'] },
    { control: 'VSNeoComLoc', parentControl: 'VSNeoCom', conditions: ['Yes'] },

    //  CHORDAL/LEAFLET TRANSFER
    { control: 'VSMitRChord', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'K:chorLeafLoc', parentControl: 'VSMitRChord', conditions: ['Yes'] },
    { control: 'VSChorLfAnt', parentControl: 'VSMitRChord', conditions: ['Yes'] },
    { control: 'VSChorLfAntLocD', parentControl: 'VSChorLfAnt', conditions: ['Yes'] },
    { control: 'K:antChorLfLoc', parentControl: 'VSChorLfAntLocD', conditions: ['Yes'] },
    { control: 'VSChorLfAntA1', parentControl: 'VSChorLfAntLocD', conditions: ['Yes'] },
    { control: 'VSChorLfAntA2', parentControl: 'VSChorLfAntLocD', conditions: ['Yes'] },
    { control: 'VSChorLfAntA3', parentControl: 'VSChorLfAntLocD', conditions: ['Yes'] },
    { control: 'VSChorLfPost', parentControl: 'VSMitRChord', conditions: ['Yes'] },
    { control: 'VSChorLfPostLocD', parentControl: 'VSChorLfPost', conditions: ['Yes'] },
    { control: 'K:postChorLfLoc', parentControl: 'VSChorLfPostLocD', conditions: ['Yes'] },
    { control: 'VSChorLfPostP1', parentControl: 'VSChorLfPostLocD', conditions: ['Yes'] },
    { control: 'VSChorLfPostP2', parentControl: 'VSChorLfPostLocD', conditions: ['Yes'] },
    { control: 'VSChorLfPostP3', parentControl: 'VSChorLfPostLocD', conditions: ['Yes'] },
    { control: 'VSChorLfCom', parentControl: 'VSMitRChord', conditions: ['Yes'] },
    { control: 'VSChorLfComLoc', parentControl: 'VSChorLfCom', conditions: ['Yes'] },

    { control: 'VSMitRFold', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'VSMitRSlidP', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'VSMitRADecalc', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'VSMitRLeafERP', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'VSMitRLeafERPLoc', parentControl: 'VSMitRLeafERP', conditions: ['Yes'] },
    { control: 'VSMitREdge', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'VSMitRMitComm', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'VSMitRMitCplasty', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'VSMitRMitCleft', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },
    { control: 'VSMitParaprosLeak', parentControl: 'VSMVRepApp', conditions: ['Surgical'] },

    { control: 'MitralIntent', parentControl: 'VSMVPr', conditions: ['Replacement'] },
    { control: 'VSChorPres', parentControl: 'VSMVPr', conditions: ['Replacement'] },
    { control: 'VSTCVMit', parentControl: 'VSMVPr', conditions: ['Replacement'] },

    { control: 'MitralImplant', parentControl: 'VSMV', conditions: ['!', 'No'] },
    { control: 'MitralImplantTy', parentControl: 'MitralImplant', conditions: ['Yes'] },
    { control: 'VSMiIm', parentControl: 'MitralImplant', conditions: ['Yes'] },
    { control: 'VSMiImSz', parentControl: 'MitralImplant', conditions: ['Yes'] },
    { control: 'VSMiImUDI', parentControl: 'MitralImplant', conditions: ['Yes'] },

    //  TRICUSPID VALVE
    { control: 'VSTV', parentControl: 'I:OpValve', conditions: ['Yes'] },
    { control: 'VSTVPr', parentControl: 'VSTV', conditions: ['!', 'No'] },
    { control: 'VSTrRepAnnulo', parentControl: 'VSTVPr', conditions: ['Repair'] },
    { control: 'OpTricusAnTy', parentControl: 'VSTrRepAnnulo', conditions: ['Yes'] },
    { control: 'VSTrLeafRes', parentControl: 'VSTVPr', conditions: ['Repair'] },
    { control: 'VSTCVTri', parentControl: 'VSTVPr', conditions: ['Replacement'] },
    { control: 'TricuspidImplant', parentControl: 'VSTV', conditions: ['!', 'No'] },
    { control: 'TricusImplantTy', parentControl: 'TricuspidImplant', conditions: ['Yes'] },
    { control: 'VSTrIm', parentControl: 'TricuspidImplant', conditions: ['Yes'] },
    { control: 'VSTrImSz', parentControl: 'TricuspidImplant', conditions: ['Yes'] },
    { control: 'VSTrImUDI', parentControl: 'TricuspidImplant', conditions: ['Yes'] },

    //  PULMONIC VALVE
    { control: 'VSPV', parentControl: 'I:OpValve', conditions: ['Yes'] },
    { control: 'OpPulm', parentControl: 'VSPV', conditions: ['!', 'No'] },
    { control: 'VSTCVPu', parentControl: 'OpPulm', conditions: ['Replacement'] },
    { control: 'PulmonicImplant', parentControl: 'VSPV', conditions: ['!', 'No'] },
    { control: 'VSPuTypeImp', parentControl: 'PulmonicImplant', conditions: ['!', 'No'] },
    { control: 'VSPuImpMat', parentControl: 'VSPuTypeImp', conditions: ['Surgeon Fashioned'] },
    { control: 'PulmonicImplantTy', parentControl: 'VSPuTypeImp', conditions: ['Commercially Supplied'] },
    { control: 'VSPuIm', parentControl: 'PulmonicImplant', conditions: ['Yes'] },
    { control: 'VSPuImSz', parentControl: 'PulmonicImplant', conditions: ['Yes'] },
    { control: 'VSPuImUDI', parentControl: 'PulmonicImplant', conditions: ['Yes'] }
  ],
  sectionL: [
    { control: 'IABPWhen', parentControl: 'IABP', conditions: ['Yes'] },
    { control: 'IABPInd', parentControl: 'IABP', conditions: ['Yes'] },
    { control: 'CathBasAssistTy', parentControl: 'CathBasAssist', conditions: ['Yes'] },
    { control: 'CathBasAssistWhen', parentControl: 'CathBasAssist', conditions: ['Yes'] },
    { control: 'CathBasAssistInd', parentControl: 'CathBasAssist', conditions: ['Yes'] },
    { control: 'ECMOWhen', parentControl: 'ECMO', conditions: ['!', 'No'] },
    { control: 'ECMOInd', parentControl: 'ECMO', conditions: ['!', 'No'] }
  ],
  sectionL2: [
    { control: 'PrevVADF', parentControl: 'PrevVAD', conditions: ['Yes'] },
    { control: 'PrevVADD', parentControl: 'PrevVAD', conditions: ['Yes'] },
    { control: 'PrevVADIn', parentControl: 'PrevVAD', conditions: ['Yes'] },
    { control: 'PrevVADTy', parentControl: 'PrevVAD', conditions: ['Yes'] },
    { control: 'PrevVADDevice', parentControl: 'PrevVAD', conditions: ['Yes'] },
    { control: 'PrevVADUDI', parentControl: 'PrevVAD', conditions: ['Yes'] },
    { control: 'PrevVADExp', parentControl: 'PrevVAD', conditions: ['Yes'] },
    {
      control: 'PrevVADExpRsn',
      parentControl: 'PrevVADExp',
      conditions: ['Yes, not during this procedure', 'Yes, during this procedure']
    },
    {
      control: 'PrevVADExpDt',
      parentControl: 'PrevVADExp',
      conditions: ['Yes, not during this procedure']
    },

    { control: 'L2:vad1', parentControl: 'VADImp', conditions: ['Yes'] },
    { control: 'VImp', parentControl: 'VADImp', conditions: ['Yes'] },
    { control: 'VADImpTmg', parentControl: 'VImp', conditions: ['Yes'] },
    { control: 'VImpDt', parentControl: 'VImp', conditions: ['Yes'] },
    { control: 'VADInd', parentControl: 'VImp', conditions: ['Yes'] },
    { control: 'VImpTy', parentControl: 'VImp', conditions: ['Yes'] },
    { control: 'VProdTy', parentControl: 'VImp', conditions: ['Yes'] },
    { control: 'VImpUDI', parentControl: 'VImp', conditions: ['Yes'] },
    { control: 'VExp', parentControl: 'VImp', conditions: ['Yes'] },
    {
      control: 'VExpRsn',
      parentControl: 'VExp',
      conditions: ['Yes, not during this procedure', 'Yes, during this procedure']
    },
    { control: 'VExpDt', parentControl: 'VExp', conditions: ['Yes, not during this procedure'] },

    { control: 'L2:vad2', parentControl: 'VImp', conditions: ['Yes'] },
    { control: 'VImp2', parentControl: 'VImp', conditions: ['Yes'] },
    { control: 'VADImpTmg2', parentControl: 'VImp2', conditions: ['Yes'] },
    { control: 'VImpDt2', parentControl: 'VImp2', conditions: ['Yes'] },
    { control: 'VADInd2', parentControl: 'VImp2', conditions: ['Yes'] },
    { control: 'VImpTy2', parentControl: 'VImp2', conditions: ['Yes'] },
    { control: 'VProdTy2', parentControl: 'VImp2', conditions: ['Yes'] },
    { control: 'VImpUDI2', parentControl: 'VImp2', conditions: ['Yes'] },
    { control: 'VExp2', parentControl: 'VImp2', conditions: ['Yes'] },
    {
      control: 'VExpRsn2',
      parentControl: 'VExp2',
      conditions: ['Yes, not during this procedure', 'Yes, during this procedure']
    },
    { control: 'VExpDt2', parentControl: 'VExp2', conditions: ['Yes, not during this procedure'] },

    { control: 'L2:vad3', parentControl: 'VImp2', conditions: ['Yes'] },
    { control: 'VImp3', parentControl: 'VImp2', conditions: ['Yes'] },
    { control: 'VADImpTmg3', parentControl: 'VImp3', conditions: ['Yes'] },
    { control: 'VImpDt3', parentControl: 'VImp3', conditions: ['Yes'] },
    { control: 'VADInd3', parentControl: 'VImp3', conditions: ['Yes'] },
    { control: 'VImpTy3', parentControl: 'VImp3', conditions: ['Yes'] },
    { control: 'VProdTy3', parentControl: 'VImp3', conditions: ['Yes'] },
    { control: 'VImpUDI3', parentControl: 'VImp3', conditions: ['Yes'] },
    { control: 'VExp3', parentControl: 'VImp3', conditions: ['Yes'] },
    {
      control: 'VExpRsn3',
      parentControl: 'VExp3',
      conditions: ['Yes, not during this procedure', 'Yes, during this procedure']
    },
    { control: 'VExpDt3', parentControl: 'VExp3', conditions: ['Yes, not during this procedure'] }
  ],
  sectionM: [
    { control: 'M:sectionMBody', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarASDPFO', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarASDSec', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarAFibIntraLes', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarAFibEpLes', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarAAProc', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarAAMeth', parentControl: 'OCarAAProc', conditions: ['!', 'No'] },
    {
      control: 'OCarAAModel',
      parentControl: 'OCarAAMeth',
      conditions: ['Epicardially applied occlusion device']
    },
    {
      control: 'OCarAAUDI',
      parentControl: 'OCarAAMeth',
      conditions: ['Epicardially applied occlusion device']
    },
    { control: 'OCarACD', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarLeadInsert', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarACDLE', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarCong', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarLVA', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarStemCell', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCPulThromDis', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarSubaStenRes', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarSubaStenResTy', parentControl: 'OCarSubaStenRes', conditions: ['Yes'] },
    { control: 'OCarSVR', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarLasr', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCTumor', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarCrTx', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarTrma', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarVSD', parentControl: 'I:OpOCard', conditions: ['!', 'No'] },
    { control: 'OCarOthr', parentControl: 'I:OpOCard', conditions: ['!', 'No'] }
  ],
  sectionM1: [
    { control: 'M1:sectionM1Body', parentControl: 'I:AFibProc', conditions: ['Yes'] },
    { control: 'OCarAFibLesLoc', parentControl: 'I:AFibProc', conditions: ['Yes'] },
    { control: 'M1:methLesCrea', parentControl: 'I:AFibProc', conditions: ['Yes'] },
    { control: 'OCarAFibMethRad', parentControl: 'I:AFibProc', conditions: ['Yes'] },
    { control: 'OCarAFibMethRadBi', parentControl: 'OCarAFibMethRad', conditions: ['Yes'] },
    { control: 'OCarAFibMethCAS', parentControl: 'I:AFibProc', conditions: ['Yes'] },
    { control: 'OCarAFibMethCryo', parentControl: 'I:AFibProc', conditions: ['Yes'] },
    { control: 'OCarLesDoc', parentControl: 'I:AFibProc', conditions: ['Yes'] },
    { control: 'M1:afib1Fig', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'M1:afib2Fig', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes1', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes2', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes3a', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes3b', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes4', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes5', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes6', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes7', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes8', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes9', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes10', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes11', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes12', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes13', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes14', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes15a', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFibLes15b', parentControl: 'OCarLesDoc', conditions: ['Yes'] },
    { control: 'AFitLesCSL', parentControl: 'OCarLesDoc', conditions: ['Yes'] }
  ],
  sectionM2: [
    { control: 'M2:sectionM2Body', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'FamHistAorta', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'PatGenHist', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'PriorAorta', parentControl: 'I:AortProc', conditions: ['!', 'No'] },

    { control: 'M2:int1', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepRoot', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepTyRoot', parentControl: 'PriorRepRoot', conditions: ['Yes'] },
    { control: 'PriorFailRoot', parentControl: 'PriorRepRoot', conditions: ['Yes'] },
    { control: 'PriorProgRoot', parentControl: 'PriorRepRoot', conditions: ['Yes'] },

    { control: 'M2:int2', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepAsc', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepTyAsc', parentControl: 'PriorRepAsc', conditions: ['Yes'] },
    { control: 'PriorFailAsc', parentControl: 'PriorRepAsc', conditions: ['Yes'] },
    { control: 'PriorProgAsc', parentControl: 'PriorRepAsc', conditions: ['Yes'] },

    { control: 'M2:int3', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepArch', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepTyArch', parentControl: 'PriorRepArch', conditions: ['Yes'] },
    { control: 'PriorFailArch', parentControl: 'PriorRepArch', conditions: ['Yes'] },
    { control: 'PriorProgArch', parentControl: 'PriorRepArch', conditions: ['Yes'] },

    { control: 'M2:int4', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepDesc', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepTyDesc', parentControl: 'PriorRepDesc', conditions: ['Yes'] },
    { control: 'PriorFailDesc', parentControl: 'PriorRepDesc', conditions: ['Yes'] },
    { control: 'PriorProgDesc', parentControl: 'PriorRepDesc', conditions: ['Yes'] },

    { control: 'M2:int5', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepSupraAb', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepTySupraAb', parentControl: 'PriorRepSupraAb', conditions: ['Yes'] },
    { control: 'PriorFailSupraAb', parentControl: 'PriorRepSupraAb', conditions: ['Yes'] },
    { control: 'PriorProgSupraAb', parentControl: 'PriorRepSupraAb', conditions: ['Yes'] },

    { control: 'M2:int6', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepInfraAb', parentControl: 'PriorAorta', conditions: ['Yes'] },
    { control: 'PriorRepTyInfraAb', parentControl: 'PriorRepInfraAb', conditions: ['Yes'] },
    { control: 'PriorFailInfraAb', parentControl: 'PriorRepInfraAb', conditions: ['Yes'] },
    { control: 'PriorProgInfraAb', parentControl: 'PriorRepInfraAb', conditions: ['Yes'] },

    { control: 'Endoleak', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'EndoleakTypeI', parentControl: 'Endoleak', conditions: ['Yes'] },
    { control: 'EndoleakTyILoc', parentControl: 'EndoleakTypeI', conditions: ['Yes'] },
    { control: 'EndoleakTypeII', parentControl: 'Endoleak', conditions: ['Yes'] },
    { control: 'EndoleakVessNum', parentControl: 'EndoleakTypeII', conditions: ['Yes'] },
    { control: 'EndoleakTypeIII', parentControl: 'Endoleak', conditions: ['Yes'] },
    { control: 'EndoleakType', parentControl: 'EndoleakTypeIII', conditions: ['Yes'] },
    { control: 'EndoleakTypeIV', parentControl: 'Endoleak', conditions: ['Yes'] },
    { control: 'EndoleakTypeV', parentControl: 'Endoleak', conditions: ['Yes'] },

    { control: 'Infection', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'InfecType', parentControl: 'Infection', conditions: ['Yes'] },

    { control: 'Trauma', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'M2:traumaLoc', parentControl: 'Trauma', conditions: ['Yes'] },
    { control: 'TraumacRoot', parentControl: 'Trauma', conditions: ['Yes'] },
    { control: 'TraumaAsc', parentControl: 'Trauma', conditions: ['Yes'] },
    { control: 'TraumaArch', parentControl: 'Trauma', conditions: ['Yes'] },
    { control: 'TraumaDesc', parentControl: 'Trauma', conditions: ['Yes'] },
    { control: 'TraumaThorac', parentControl: 'Trauma', conditions: ['Yes'] },
    { control: 'TraumaAbdom', parentControl: 'Trauma', conditions: ['Yes'] },

    { control: 'Presentation', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'PrimIndic', parentControl: 'I:AortProc', conditions: ['!', 'No'] },

    //  ANEURYSM
    { control: 'AnEtilogy', parentControl: 'PrimIndic', conditions: ['Aneurysm'] },
    { control: 'AnType', parentControl: 'PrimIndic', conditions: ['Aneurysm'] },
    { control: 'AnRupt', parentControl: 'PrimIndic', conditions: ['Aneurysm'] },
    { control: 'AnRuptCon', parentControl: 'AnRupt', conditions: ['Yes'] },
    { control: 'AnLoc', parentControl: 'PrimIndic', conditions: ['Aneurysm'] },

    //  DISSECTION
    { control: 'DisTiming', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'DisOnsetDtKnown', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'DisOnsetDt', parentControl: 'DisOnsetDtKnown', conditions: ['Yes'] },
    { control: 'DisTearLoc', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'DisSecLoc', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'DisRetExt', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'DisRetLoc', parentControl: 'DisRetExt', conditions: ['Yes'] },
    { control: 'DisPosTEVAR', parentControl: 'DisRetExt', conditions: ['Yes'] },
    { control: 'DistalExt', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'DistalExtLoc', parentControl: 'DistalExt', conditions: ['Yes'] },

    { control: 'DisMal', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'M2:malperfus', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalCor', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalRtSubclav', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalRtComCar', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalComL', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalSubL', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalCel', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalSup', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalRenL', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalRenR', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalIlio', parentControl: 'DisMal', conditions: ['Yes'] },
    { control: 'DisMalSpin', parentControl: 'DisMal', conditions: ['Yes'] },

    { control: 'DisLowMotFun', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'DisLowSenDef', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'DisRupt', parentControl: 'PrimIndic', conditions: ['Dissection'] },
    { control: 'DisRuptCon', parentControl: 'DisRupt', conditions: ['Yes'] },
    { control: 'DisRuptLoc', parentControl: 'DisRupt', conditions: ['Yes'] },

    //  ROOT
    { control: 'M2:root', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'RootAAnnEctasia', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'RootDilaAsym', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'RoottDilaAsym', parentControl: 'RootDilaAsym', conditions: ['Yes'] },
    { control: 'RootSinus', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'RootSinusLoc', parentControl: 'RootSinus', conditions: ['Yes'] },

    //  ARCH
    { control: 'M2:arch', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ArchType', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ArchAbRtSub', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ArchAbLtSub', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ArchKom', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ArchBovine', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ArchVarVertOr', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ArchPatIMA', parentControl: 'I:AortProc', conditions: ['!', 'No'] },

    //  ASCENDING
    { control: 'M2:ascending', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'AscAsymDil', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'AscProxGr', parentControl: 'I:AortProc', conditions: ['!', 'No'] },

    { control: 'Diameter3DMeas', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'Diam3DAnnulus', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DSinus', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DSinotubular', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DMidAsc', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DDistalAsc', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone1', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone2', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone3', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone4', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone5', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone6', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone7', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone8', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone9', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone10', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },
    { control: 'Diam3DZone11', parentControl: 'Diameter3DMeas', conditions: ['Yes'] },

    { control: 'M2:preopDiameter', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstAnnulus', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstSinus', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstSinotubular', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstMidAsc', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstDistalAsc', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone1', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone2', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone3', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone4', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone5', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone6', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone7', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone8', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone9', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone10', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DiamLgstZone11', parentControl: 'I:AortProc', conditions: ['!', 'No'] },

    //  INTERVENTION
    { control: 'M2:intervention', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'PlanStagHybrid', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ArchProc', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ArchDisTech', parentControl: 'ArchProc', conditions: ['Yes'] },
    { control: 'ArchDiscSite', parentControl: 'ArchProc', conditions: ['Yes'] },
    { control: 'ArchDisExt', parentControl: 'ArchProc', conditions: ['Yes'] },
    { control: 'ArchBranReimp', parentControl: 'ArchProc', conditions: ['Yes'] },
    { control: 'ArchBranInnom', parentControl: 'ArchBranReimp', conditions: ['Yes'] },
    { control: 'ArchBranRSub', parentControl: 'ArchBranReimp', conditions: ['Yes'] },
    { control: 'ArchBranRComm', parentControl: 'ArchBranReimp', conditions: ['Yes'] },
    { control: 'ArchBranLComm', parentControl: 'ArchBranReimp', conditions: ['Yes'] },
    { control: 'ArchBranLSub', parentControl: 'ArchBranReimp', conditions: ['Yes'] },
    { control: 'ArchBranLVert', parentControl: 'ArchBranReimp', conditions: ['Yes'] },
    { control: 'ArchBranOth', parentControl: 'ArchBranReimp', conditions: ['Yes'] },

    { control: 'DescAortaProc', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'DescAortaLoc', parentControl: 'DescAortaProc', conditions: ['Yes'] },
    { control: 'AortaInterReimp', parentControl: 'DescAortaProc', conditions: ['Yes'] },
    { control: 'AortaDisZone', parentControl: 'DescAortaProc', conditions: ['Yes'] },
    { control: 'AortaVisceral', parentControl: 'DescAortaProc', conditions: ['Yes'] },
    { control: 'AortaViscCel', parentControl: 'AortaVisceral', conditions: ['Yes'] },
    { control: 'AortaViscSup', parentControl: 'AortaVisceral', conditions: ['Yes'] },
    { control: 'AortaViscRenR', parentControl: 'AortaVisceral', conditions: ['Yes'] },
    { control: 'AortaViscRenL', parentControl: 'AortaVisceral', conditions: ['Yes'] },

    { control: 'EndovasProc', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'EndovasAccess', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'EndovasPercAcc', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'EndoProxZone', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'EndoDistalZone', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'EndovasTAVR', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'EndovasTEVAR', parentControl: 'EndovasProc', conditions: ['Yes'] },

    //  Arch Vessel management
    { control: 'M2:archVessel', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'Innominate', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'InAortaInnom', parentControl: 'Innominate', conditions: ['Extra-anatomic Bypass'] },
    { control: 'InAortaCarotid', parentControl: 'Innominate', conditions: ['Extra-anatomic Bypass'] },
    { control: 'InAortaSubclav', parentControl: 'Innominate', conditions: ['Extra-anatomic Bypass'] },
    { control: 'InCaroSubclav', parentControl: 'Innominate', conditions: ['Extra-anatomic Bypass'] },
    { control: 'InOther', parentControl: 'Innominate', conditions: ['Extra-anatomic Bypass'] },

    { control: 'LeftCarotid', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'LTCaroAortaCaro', parentControl: 'LeftCarotid', conditions: ['Extra-anatomic Bypass'] },
    { control: 'LTCaroInnomCaro', parentControl: 'LeftCarotid', conditions: ['Extra-anatomic Bypass'] },
    { control: 'LTCaroCarotid', parentControl: 'LeftCarotid', conditions: ['Extra-anatomic Bypass'] },
    { control: 'LTCaroOther', parentControl: 'LeftCarotid', conditions: ['Extra-anatomic Bypass'] },

    { control: 'LeftSubclavian', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'LTSubAortaSub', parentControl: 'LeftSubclavian', conditions: ['Extra-anatomic Bypass'] },
    {
      control: 'LTSubCarotidSub',
      parentControl: 'LeftSubclavian',
      conditions: ['Extra-anatomic Bypass']
    },
    { control: 'LTSubOther', parentControl: 'LeftSubclavian', conditions: ['Extra-anatomic Bypass'] },
    { control: 'OthArchVes', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'OthInnomCaro', parentControl: 'OthArchVes', conditions: ['Yes'] },
    { control: 'OthInnomSub', parentControl: 'OthArchVes', conditions: ['Yes'] },
    { control: 'OthSubSub', parentControl: 'OthArchVes', conditions: ['Yes'] },
    { control: 'OthOther', parentControl: 'OthArchVes', conditions: ['Yes'] },

    //  Visceral Vessel management
    { control: 'M2:visceralVessel', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'Celiac', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'CeliacAortaCeli', parentControl: 'Celiac', conditions: ['Extra-anatomic Bypass'] },
    { control: 'CeliacIliacCeliac', parentControl: 'Celiac', conditions: ['Extra-anatomic Bypass'] },
    { control: 'CeliacOther', parentControl: 'Celiac', conditions: ['Extra-anatomic Bypass'] },

    { control: 'SupMesenteric', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'SupMesAortaSuMe', parentControl: 'SupMesenteric', conditions: ['Extra-anatomic Bypass'] },
    {
      control: 'SupMesIliacSupMe',
      parentControl: 'SupMesenteric',
      conditions: ['Extra-anatomic Bypass']
    },
    { control: 'SupMesOther', parentControl: 'SupMesenteric', conditions: ['Extra-anatomic Bypass'] },

    { control: 'RightRenal', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'RtRenAortaRtRe', parentControl: 'RightRenal', conditions: ['Extra-anatomic Bypass'] },
    { control: 'RtRenIliacRtRen', parentControl: 'RightRenal', conditions: ['Extra-anatomic Bypass'] },
    { control: 'RtRenOther', parentControl: 'RightRenal', conditions: ['Extra-anatomic Bypass'] },

    { control: 'LeftRenal', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'LtRenAortaLtRe', parentControl: 'LeftRenal', conditions: ['Extra-anatomic Bypass'] },
    { control: 'LtRenIliacLtRen', parentControl: 'LeftRenal', conditions: ['Extra-anatomic Bypass'] },
    { control: 'LtRenOther', parentControl: 'LeftRenal', conditions: ['Extra-anatomic Bypass'] },

    { control: 'RightIliac', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'RtIliacFemFem', parentControl: 'RightIliac', conditions: ['Extra-anatomic Bypass'] },
    { control: 'RtIliacOther', parentControl: 'RightIliac', conditions: ['Extra-anatomic Bypass'] },

    { control: 'LeftIliac', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'LtIliacFemFem', parentControl: 'LeftIliac', conditions: ['Extra-anatomic Bypass'] },
    { control: 'LtIliacOther', parentControl: 'LeftIliac', conditions: ['Extra-anatomic Bypass'] },

    { control: 'IntIliacPres', parentControl: 'EndovasProc', conditions: ['Yes'] },

    { control: 'OthVisVes', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'OthVisAortOth', parentControl: 'OthVisVes', conditions: ['Yes'] },
    { control: 'OthVisIliacOth', parentControl: 'OthVisVes', conditions: ['Yes'] },
    { control: 'OthVisOther', parentControl: 'OthVisVes', conditions: ['Yes'] },

    { control: 'DisProxTearCov', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'EndoEndProc', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'EndoEndProcTy', parentControl: 'EndoEndProc', conditions: ['Yes'] },

    { control: 'ConvToOpen', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'ConvToOpenRes', parentControl: 'ConvToOpen', conditions: ['Yes'] },
    { control: 'IntDisExten', parentControl: 'EndovasProc', conditions: ['Yes'] },

    { control: 'UnintRup', parentControl: 'EndovasProc', conditions: ['Yes'] },
    { control: 'UnintRupLoc', parentControl: 'UnintRup', conditions: ['Yes'] },

    { control: 'SpinalDrain', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'MotorEvoke', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'MotorEvokeAb', parentControl: 'MotorEvoke', conditions: ['Yes'] },
    { control: 'SomatEvoke', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'SomatEvokeAb', parentControl: 'SomatEvoke', conditions: ['Yes'] },
    { control: 'IntraOpEEG', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'IntraOpEEGAb', parentControl: 'IntraOpEEG', conditions: ['Yes'] },
    { control: 'IntraOpIVUS', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'TransDoppler', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'IntraOpAng', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'IntraOpAngVol', parentControl: 'IntraOpAng', conditions: ['Yes'] },
    { control: 'IntraOpAngFlTm', parentControl: 'IntraOpAng', conditions: ['Yes'] },

    { control: 'M2:endovasDevices', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'ADevIns', parentControl: 'I:AortProc', conditions: ['!', 'No'] },
    { control: 'M2:endoDevice1', parentControl: 'ADevIns', conditions: ['Yes'] },
    { control: 'ADevLoc01', parentControl: 'ADevIns', conditions: ['Yes'] },
    { control: 'ADevDelMeth01', parentControl: 'ADevIns', conditions: ['Yes'] },
    { control: 'ADevOut01', parentControl: 'ADevIns', conditions: ['Yes'] },
    { control: 'ADevModel01', parentControl: 'ADevIns', conditions: ['Yes'] },
    { control: 'ADevUDI01', parentControl: 'ADevIns', conditions: ['Yes'] },

    { control: 'M2:endoDevice2', parentControl: 'ADevIns', conditions: ['Yes'] },
    { control: 'ADevLoc02', parentControl: 'ADevIns', conditions: ['Yes'] },
    {
      control: 'ADevDelMeth02',
      parentControl: 'ADevLoc02',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut02',
      parentControl: 'ADevLoc02',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel02',
      parentControl: 'ADevLoc02',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI02',
      parentControl: 'ADevLoc02',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice3',
      parentControl: 'ADevLoc02',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc03',
      parentControl: 'ADevLoc02',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth03',
      parentControl: 'ADevLoc03',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut03',
      parentControl: 'ADevLoc03',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel03',
      parentControl: 'ADevLoc03',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI03',
      parentControl: 'ADevLoc03',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice4',
      parentControl: 'ADevLoc03',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc04',
      parentControl: 'ADevLoc03',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth04',
      parentControl: 'ADevLoc04',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut04',
      parentControl: 'ADevLoc04',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel04',
      parentControl: 'ADevLoc04',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI04',
      parentControl: 'ADevLoc04',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice5',
      parentControl: 'ADevLoc04',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc05',
      parentControl: 'ADevLoc04',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth05',
      parentControl: 'ADevLoc05',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut05',
      parentControl: 'ADevLoc05',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel05',
      parentControl: 'ADevLoc05',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI05',
      parentControl: 'ADevLoc05',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice6',
      parentControl: 'ADevLoc05',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc06',
      parentControl: 'ADevLoc05',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth06',
      parentControl: 'ADevLoc06',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut06',
      parentControl: 'ADevLoc06',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel06',
      parentControl: 'ADevLoc06',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI06',
      parentControl: 'ADevLoc06',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice7',
      parentControl: 'ADevLoc06',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc07',
      parentControl: 'ADevLoc06',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth07',
      parentControl: 'ADevLoc07',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut07',
      parentControl: 'ADevLoc07',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel07',
      parentControl: 'ADevLoc07',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI07',
      parentControl: 'ADevLoc07',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice8',
      parentControl: 'ADevLoc07',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc08',
      parentControl: 'ADevLoc07',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth08',
      parentControl: 'ADevLoc08',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut08',
      parentControl: 'ADevLoc08',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel08',
      parentControl: 'ADevLoc08',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI08',
      parentControl: 'ADevLoc08',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice9',
      parentControl: 'ADevLoc08',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc09',
      parentControl: 'ADevLoc08',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth09',
      parentControl: 'ADevLoc09',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut09',
      parentControl: 'ADevLoc09',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel09',
      parentControl: 'ADevLoc09',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI09',
      parentControl: 'ADevLoc09',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice10',
      parentControl: 'ADevLoc09',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc10',
      parentControl: 'ADevLoc09',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth10',
      parentControl: 'ADevLoc10',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut10',
      parentControl: 'ADevLoc10',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel10',
      parentControl: 'ADevLoc10',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI10',
      parentControl: 'ADevLoc10',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice11',
      parentControl: 'ADevLoc10',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc11',
      parentControl: 'ADevLoc10',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth11',
      parentControl: 'ADevLoc11',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut11',
      parentControl: 'ADevLoc11',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel11',
      parentControl: 'ADevLoc11',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI11',
      parentControl: 'ADevLoc11',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice12',
      parentControl: 'ADevLoc11',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc12',
      parentControl: 'ADevLoc11',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth12',
      parentControl: 'ADevLoc12',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut12',
      parentControl: 'ADevLoc12',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel12',
      parentControl: 'ADevLoc12',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI12',
      parentControl: 'ADevLoc12',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice13',
      parentControl: 'ADevLoc12',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc13',
      parentControl: 'ADevLoc12',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth13',
      parentControl: 'ADevLoc13',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut13',
      parentControl: 'ADevLoc13',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel13',
      parentControl: 'ADevLoc13',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI13',
      parentControl: 'ADevLoc13',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice14',
      parentControl: 'ADevLoc13',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc14',
      parentControl: 'ADevLoc13',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth14',
      parentControl: 'ADevLoc14',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut14',
      parentControl: 'ADevLoc14',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel14',
      parentControl: 'ADevLoc14',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI14',
      parentControl: 'ADevLoc14',
      conditions: ['!', 'No additional devices inserted']
    },

    {
      control: 'M2:endoDevice15',
      parentControl: 'ADevLoc14',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevLoc15',
      parentControl: 'ADevLoc14',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevDelMeth15',
      parentControl: 'ADevLoc15',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevOut15',
      parentControl: 'ADevLoc15',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevModel15',
      parentControl: 'ADevLoc15',
      conditions: ['!', 'No additional devices inserted']
    },
    {
      control: 'ADevUDI15',
      parentControl: 'ADevLoc15',
      conditions: ['!', 'No additional devices inserted']
    }
  ],
  sectionM3: [
    { control: 'M3:sectionM3Body', parentControl: 'M:OCarCong', conditions: ['Yes'] },
    { control: 'M3:congenDiag', parentControl: 'M:OCarCong', conditions: ['Yes'] },
    { control: 'OCarCongDiag1', parentControl: 'M:OCarCong', conditions: ['Yes'] },
    { control: 'OCarCongDiag2', parentControl: 'M:OCarCong', conditions: ['Yes'] },
    { control: 'OCarCongDiag3', parentControl: 'M:OCarCong', conditions: ['Yes'] },
    { control: 'M3:congenProc', parentControl: 'M:OCarCong', conditions: ['Yes'] },
    { control: 'OCarCongProc1', parentControl: 'M:OCarCong', conditions: ['Yes'] },
    { control: 'OCarCongProc2', parentControl: 'M:OCarCong', conditions: ['Yes'] },
    { control: 'OCarCongProc3', parentControl: 'M:OCarCong', conditions: ['Yes'] }
  ],
  sectionN: [
    { control: 'N:sectionNBody', parentControl: 'I:OpONCard', conditions: ['Yes'] },
    { control: 'ONCCarEn', parentControl: 'I:OpONCard', conditions: ['Yes'] },
    { control: 'ONCOVasc', parentControl: 'I:OpONCard', conditions: ['Yes'] },
    { control: 'ONCOThor', parentControl: 'I:OpONCard', conditions: ['Yes'] },
    { control: 'ONCOther', parentControl: 'I:OpONCard', conditions: ['Yes'] }
  ],
  sectionO: [
    { control: 'BdRBCU', parentControl: 'BldProd', conditions: ['Yes'] },
    { control: 'BdFFPU', parentControl: 'BldProd', conditions: ['Yes'] },
    { control: 'BdCryoU', parentControl: 'BldProd', conditions: ['Yes'] },
    { control: 'BdPlatU', parentControl: 'BldProd', conditions: ['Yes'] },
    { control: 'VentHrsA', parentControl: 'PostopIntub', conditions: ['Yes'] },
    { control: 'ICUInHrs', parentControl: 'ICUVisit', conditions: ['Yes'] },
    { control: 'ICUAdHrs', parentControl: 'ICUReadm', conditions: ['Yes'] },
    { control: 'POpTTAR', parentControl: 'POpTTEch', conditions: ['Yes'] },
    { control: 'POpAortParaLk', parentControl: 'POpTTEch', conditions: ['Yes'] },
    { control: 'POpTTMR', parentControl: 'POpTTEch', conditions: ['Yes'] },
    { control: 'POpMitParaLk', parentControl: 'POpTTEch', conditions: ['Yes'] },
    { control: 'POpTTTR', parentControl: 'POpTTEch', conditions: ['Yes'] },
    { control: 'POpTTPu', parentControl: 'POpTTEch', conditions: ['Yes'] },
    { control: 'POpEF', parentControl: 'POpEFD', conditions: ['Yes'] },
    { control: 'POpPkCKMB', parentControl: 'POpEnzDrawn', conditions: ['Yes'] },
    { control: 'POpPkTrI', parentControl: 'POpEnzDrawn', conditions: ['Yes'] },
    { control: 'POpPkTrT', parentControl: 'POpEnzDrawn', conditions: ['Yes'] }
  ],
  sectionP: [
    { control: 'CSternalSupInf', parentControl: 'SurSInf', conditions: ['Yes'] },
    { control: 'DeepSternInf', parentControl: 'SurSInf', conditions: ['Yes'] },
    { control: 'DeepSternInfDt', parentControl: 'DeepSternInf', conditions: ['!', 'No'] },
    { control: 'CIThor', parentControl: 'SurSInf', conditions: ['Yes'] },
    { control: 'ConduitHarv', parentControl: 'SurSInf', conditions: ['Yes'] },
    { control: 'CanSite', parentControl: 'SurSInf', conditions: ['Yes'] },
    { control: 'WoundInter', parentControl: 'SurSInf', conditions: ['Yes'] },
    { control: 'WoundIntOpen', parentControl: 'WoundInter', conditions: ['Yes'] },
    { control: 'WoundIntVac', parentControl: 'WoundInter', conditions: ['Yes'] },
    { control: 'WoundIntMuscle', parentControl: 'WoundInter', conditions: ['Yes'] },
    { control: 'WoundIntOmental', parentControl: 'WoundInter', conditions: ['Yes'] },

    { control: 'P:compliOperative', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COpReBld', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COpReBldTim', parentControl: 'COpReBld', conditions: ['Yes'] },
    { control: 'COpReVlv', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CReintMI', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CReintMIVes', parentControl: 'CReintMI', conditions: ['Yes'] },
    { control: 'CReintMIIntTy', parentControl: 'CReintMI', conditions: ['Yes'] },
    { control: 'CAortReint', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CAortReintTy', parentControl: 'CAortReint', conditions: ['Yes'] },
    { control: 'COpReOth', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COpReNon', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COpPlndDelay', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CSternal', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CSternalDehis', parentControl: 'CSternal', conditions: ['Yes'] },

    { control: 'P:compliInfection', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CSepsis', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CSepsisPBC', parentControl: 'CSepsis', conditions: ['Yes'] },

    { control: 'P:compliNeuroCentral', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CNStrokP', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CNStrokTTIA', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CNEnceph', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CNComa', parentControl: 'Complics', conditions: ['Yes'] },

    { control: 'P:compliNeuroPeripheral', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CNParal', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CNParalTy', parentControl: 'CNParal', conditions: ['Yes'] },
    { control: 'CNParesis', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CNParesisTy', parentControl: 'CNParesis', conditions: ['Yes'] },
    { control: 'PhrenNrvInj', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'RecLarynNrvInj', parentControl: 'Complics', conditions: ['Yes'] },

    { control: 'P:compliPulmonary', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CPVntLng', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CPPneum', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CVTE', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'PulmEmb', parentControl: 'CVTE', conditions: ['Yes'] },
    { control: 'DVT', parentControl: 'CVTE', conditions: ['Yes'] },
    { control: 'CPlEff', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'PostOpPneumo', parentControl: 'Complics', conditions: ['Yes'] },

    { control: 'P:compliRenal', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CRenFail', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CRenDial', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'DialDur', parentControl: 'CRenDial', conditions: ['Yes'] },
    { control: 'DialStat', parentControl: 'CRenDial', conditions: ['Yes'] },
    { control: 'CUltraFil', parentControl: 'Complics', conditions: ['Yes'] },

    { control: 'P:compliVascular', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CVaIlFem', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CVaLbIsc', parentControl: 'Complics', conditions: ['Yes'] },

    { control: 'P:compliMAD', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CMAD', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CMADCanIns', parentControl: 'CMAD', conditions: ['Yes'] },
    { control: 'CMADHem', parentControl: 'CMAD', conditions: ['Yes'] },
    { control: 'CMADThromEm', parentControl: 'CMAD', conditions: ['Yes'] },
    { control: 'CMADHemolytic', parentControl: 'CMAD', conditions: ['Yes'] },
    { control: 'CMADInf', parentControl: 'CMAD', conditions: ['Yes'] },
    { control: 'CMADOther', parentControl: 'CMAD', conditions: ['Yes'] },

    { control: 'P:compliOther', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CRhythmDis', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtArrst', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtAortEndo', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtAortEndoTy', parentControl: 'COtAortEndo', conditions: ['Yes'] },
    { control: 'COtAortRupt', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CVaAoDis', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'CVaAoDisTy', parentControl: 'CVaAoDis', conditions: ['Yes'] },
    { control: 'COtAortSide', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtAortTear', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtCoag', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtTamp', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtGI', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtLiver', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtMSF', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtAFib', parentControl: 'Complics', conditions: ['Yes'] },
    { control: 'COtOther', parentControl: 'Complics', conditions: ['Yes'] }
  ],
  sectionQ: [
    {
      control: 'DischDt',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DisLoctn',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'CardRef',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'SmokCoun',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'Q:medPresDC',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'Q:antiplateletDC',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCASA',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCADP',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCOthAntiplat',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'Q:anticoagulantDC',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCDirThromIn',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCCoum',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCFactorXa',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCNovOrAnti',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCOthAnticoag',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'Q:otherDC',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCACE',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCAmiodarone',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCBeta',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCLipLowStat',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'DCLipLowNonStat',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'MtDate',
      parentControl: 'DischMortStat',
      conditions: ['Died in hospital', 'Discharged alive, died after discharge']
    },
    {
      control: 'MtCause',
      parentControl: 'DischMortStat',
      conditions: ['Died in hospital', 'Discharged alive, died after discharge']
    },
    {
      control: 'InHospDthLoc',
      parentControl: 'DischMortStat',
      conditions: ['Died in hospital']
    },
    {
      control: 'MtOpD',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, died after discharge']
    },
    {
      control: 'PostDisDthLoc',
      parentControl: 'DischMortStat',
      conditions: ['Discharged alive, died after discharge']
    }
  ],
  sectionR: [
    {
      control: 'R:sectionRBody',
      parentControl: 'Q:DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    {
      control: 'Readmit',
      parentControl: 'Q:DischMortStat',
      conditions: ['Discharged alive, last known status is alive', 'Discharged alive, died after discharge']
    },
    { control: 'ReadmitDt', parentControl: 'Readmit', conditions: ['Yes'] },
    { control: 'ReadmRsn', parentControl: 'Readmit', conditions: ['Yes'] },
    { control: 'ReadmPro', parentControl: 'Readmit', conditions: ['Yes'] },
    { control: 'ReadmAortIntTy', parentControl: 'ReadmPro', conditions: ['OR for Aorta Intervention'] },
    { control: 'ReadmAortIntInd', parentControl: 'ReadmPro', conditions: ['OR for Aorta Intervention'] }
  ],
  sectionS: [
    { control: 'TotHep', parentControl: 'HepUse', conditions: ['Yes'] },
    { control: 'HepMgmt', parentControl: 'HepUse', conditions: ['Yes'] },
    { control: 'TotProt', parentControl: 'HepUse', conditions: ['Yes'] },

    { control: 'S:volatAgtUsed', parentControl: 'VolAgentUsed', conditions: ['Yes'] },
    { control: 'VolAgentIso', parentControl: 'VolAgentUsed', conditions: ['Yes'] },
    { control: 'VolAgentSevo', parentControl: 'VolAgentUsed', conditions: ['Yes'] },
    { control: 'VolAgentDes', parentControl: 'VolAgentUsed', conditions: ['Yes'] },
    { control: 'VolAgentOth', parentControl: 'VolAgentUsed', conditions: ['Yes'] },
    { control: 'S:volatAgtTiming', parentControl: 'VolAgentUsed', conditions: ['Yes'] },
    { control: 'VolAgentTimPre', parentControl: 'VolAgentUsed', conditions: ['Yes'] },
    { control: 'VolAgentTimDur', parentControl: 'VolAgentUsed', conditions: ['Yes'] },
    { control: 'VolAgentTimPost', parentControl: 'VolAgentUsed', conditions: ['Yes'] },
    { control: 'VolAgentTimMaint', parentControl: 'VolAgentUsed', conditions: ['Yes'] },

    { control: 'PreLVEFMeas', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'PreLVEF', parentControl: 'PreLVEFMeas', conditions: ['Yes'] },
    { control: 'PreRVFx', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'PreMR', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'PreMS', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'PreAR', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'PreAS', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'PreAVAAssessed', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'PreAVA', parentControl: 'PreAVAAssessed', conditions: ['Yes'] },
    { control: 'PreTR', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'PrePFO', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'AscAoAssessed', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'MxAscAo', parentControl: 'AscAoAssessed', conditions: ['Yes'] },
    { control: 'MxAscAoThick', parentControl: 'AscAoAssessed', conditions: ['Yes'] },
    { control: 'AsAthMo', parentControl: 'AscAoAssessed', conditions: ['Yes'] },
    { control: 'AoArcVis', parentControl: 'IntraOpPreTEE', conditions: ['Yes'] },
    { control: 'MxArcAth', parentControl: 'AoArcVis', conditions: ['Yes'] },
    { control: 'ArcAthMo', parentControl: 'AoArcVis', conditions: ['Yes'] },

    { control: 'RetrAutolPrim', parentControl: 'CPBUsed', conditions: ['Yes'] },
    { control: 'TotCrystPerf', parentControl: 'CPBUsed', conditions: ['Yes'] },
    { control: 'TotColloidPerf', parentControl: 'CPBUsed', conditions: ['Yes'] },
    { control: 'TotAlbumPerf', parentControl: 'CPBUsed', conditions: ['Yes'] },
    { control: 'HemofilPerf', parentControl: 'CPBUsed', conditions: ['Yes'] },
    { control: 'InotropWeanCPB', parentControl: 'CPBUsed', conditions: ['Yes'] },
    { control: 'VasopWeanCPB', parentControl: 'CPBUsed', conditions: ['Yes'] },

    { control: 'PostSAM', parentControl: 'IntraOpPostTEE', conditions: ['Yes'] },
    { control: 'RetCPBEch', parentControl: 'IntraOpPostTEE', conditions: ['Yes'] },
    { control: 'PostLVEFMeas', parentControl: 'IntraOpPostTEE', conditions: ['Yes'] },
    { control: 'PostLVEF', parentControl: 'PostLVEFMeas', conditions: ['Yes'] },
    { control: 'PostRVFx', parentControl: 'IntraOpPostTEE', conditions: ['Yes'] },

    { control: 'PostTempMeas', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PostCoreTemp', parentControl: 'PostTempMeas', conditions: ['Yes'] },
    { control: 'PostINRMeas', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PostINR', parentControl: 'PostINRMeas', conditions: ['Yes'] },
    { control: 'PostWBCMeas', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PostWBC', parentControl: 'PostWBCMeas', conditions: ['Yes'] },
    { control: 'PostPltMeas', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PostPlt', parentControl: 'PostPltMeas', conditions: ['Yes'] },
    { control: 'PostHCTMeas', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PostHCT', parentControl: 'PostHCTMeas', conditions: ['Yes'] },
    { control: 'PostFibrinMeas', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PostFibrin', parentControl: 'PostFibrinMeas', conditions: ['Yes'] },
    { control: 'PostLactMeas', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PostLact', parentControl: 'PostLactMeas', conditions: ['Yes'] },
    { control: 'DexPost', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PropPost', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PostopDel', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PostHITAnti', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PainScorePOD3', parentControl: 'ORDeath', conditions: ['Yes'] },
    { control: 'PainScoreDisch', parentControl: 'ORDeath', conditions: ['Yes'] }
  ]
};
