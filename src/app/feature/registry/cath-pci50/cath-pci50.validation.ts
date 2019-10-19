import { FormValidations } from '../../../shared/modules/registry-form/registry-form.model';

export const validations: FormValidations = {
  sectionA: {
    HN: [
      { type: 'required', message: 'HN is required.' },
      { type: 'minlength', message: 'HN must be at least 10.' },
      { type: 'maxlength', message: 'HN cannot be more than 10.' }
    ],
    AN: [
      { type: 'required', message: 'AN is required.' },
      { type: 'minlength', message: 'AN must be at least 11.' },
      { type: 'maxlength', message: 'AN cannot be more than 12.' }
    ],
    DOB: [
      { type: 'DobStart', message: 'Birthdate should be after 1/1/1850.' },
      { type: 'DobBeforeArrivalDT', message: 'Birthdate should be before Arrival DateTime.' },
      {
        type: 'HxMIDateAfterDob',
        message: 'Most Recent MI Date should be after Birthdate.'
      },
      {
        type: 'HxPCIDateAfterDob',
        message: 'Most Recent PCI Date should be after BirthDate.'
      },
      {
        type: 'HxCABGDateAfterDob',
        message: 'Most Recent CABG Date should be after BirthDate.'
      },
      {
        type: 'StressTestDateAfterDob',
        message: 'Most Recent Stress Test Date should be after BirthDate.'
      },
      {
        type: 'CardiacCTADateAfterDob',
        message: 'Cardiac CTA Date should be after BirthDate.'
      },
      {
        type: 'CalciumScoreDateAfterDob',
        message: 'Agatston Calcium Score Date should be after BirthDate.'
      },
      {
        type: 'PriorDxAngioDateAfterDob',
        message: 'Pior Diagnostic CAG Date should be after BirthDate.'
      }
    ],
    LastName: [{ type: 'required', message: 'Last Name is required.' }],
    FirstName: [{ type: 'required', message: 'First Name is required.' }],
    Age: [
      { type: 'min', message: 'Age must be at least 18.' },
      { type: 'max', message: 'Age cannot be more than 120.' }
    ]
  },
  sectionB: {
    ArrivalDateTime: [
      { type: 'DobBeforeArrivalDT', message: 'Birthdate should be before Arrival DateTime.' },
      { type: 'ArrivalDTBeforeDischargeDT', message: 'Arrival DateTime should be before Discharge DateTime.' },
      {
        type: 'ArrivalDTBeforeProcedureStartDT',
        message: 'Arrival DateTime should be before Procedure Start DateTime.'
      },
      {
        type: 'HxMIDateBeforeArrivalDT',
        message: 'Most Recent MI Date should be before or equal to Arrival DateTime.'
      },
      {
        type: 'HxPCIDateBeforeArrivalDT',
        message: 'Most Recent PCI Date should be before or eqaul to Arrival DateTime.'
      },
      {
        type: 'HxCABGDateBeforeArrivalDT',
        message: 'Most Recent CABG Date should be before or equal to Arrival DateTime.'
      }
    ]
  },
  sectionC: {
    Height: [
      { type: 'min', message: 'Height must be at least 20 cm.' },
      { type: 'max', message: 'Height cannot be more than 260 cm.' }
    ],
    Weight: [
      { type: 'min', message: 'Weight must be at least 10 kg.' },
      { type: 'max', message: 'Weight cannot be more than 250 kg.' }
    ],
    HxMIDate: [
      {
        type: 'HxMIDateAfterDob',
        message: 'Most Recent MI Date should be after Birthdate.'
      },
      {
        type: 'HxMIDateBeforeArrivalDT',
        message: 'Most Recent MI Date should be before or equal to Arrival DateTime.'
      }
    ],
    HxPCIDate: [
      {
        type: 'HxPCIDateAfterDob',
        message: 'Most Recent PCI Date should be after BirthDate.'
      },
      {
        type: 'HxPCIDateBeforeArrivalDT',
        message: 'Most Recent PCI Date should be before or equal to Arrival DateTime.'
      }
    ],
    HxCABGDate: [
      {
        type: 'HxCABGDateAfterDob',
        message: 'Most Recent CABG Date should be after BirthDate.'
      },
      {
        type: 'HxCABGDateBeforeArrivalDT',
        message: 'Most Recent CABG Date should be before or equal to Arrival DateTime.'
      }
    ]
  },
  sectionD: {
    HR: [
      { type: 'min', message: 'HR must be at least 20 bpm.' },
      { type: 'max', message: 'HR cannot be more than 300 bpm.' }
    ],
    CalciumScore: [
      { type: 'min', message: 'Calcium Score must be at least 0.' },
      { type: 'max', message: 'Calcium Score cannot be more than 6,000.' }
    ],
    PreProcLVEF: [
      { type: 'min', message: 'LVEF must be at least 1%.' },
      { type: 'max', message: 'LVEF cannot be more than 99%.' }
    ],
    StressTestDate: [
      {
        type: 'StressTestDateAfterDob',
        message: 'Most Recent Stress Test Date should be after BirthDate.'
      },
      {
        type: 'StressTestDateBeforeProcedureStartDT',
        message: 'Most Recent Stress Test Date should be before or equal to Procedure Start DateTime.'
      }
    ],
    CardiacCTADate: [
      {
        type: 'CardiacCTADateAfterDob',
        message: 'Cardiac CTA Date should be after BirthDate.'
      },
      {
        type: 'CardiacCTADateBeforeProcedureStartDT',
        message: 'Cardiac CTA Date should be before or equal to Procedure Start DateTime.'
      }
    ],
    CalciumScoreDate: [
      {
        type: 'CalciumScoreDateAfterDob',
        message: 'Agatston Calcium Score Date should be after BirthDate.'
      },
      {
        type: 'CalciumScoreDateBeforeProcedureStartDT',
        message: 'Agatston Calcium Score Date should be before or equal to Procedure Start DateTime.'
      }
    ],
    PriorDxAngioDate: [
      {
        type: 'PriorDxAngioDateAfterDob',
        message: 'Pior Diagnostic CAG Date should be after BirthDate.'
      },
      {
        type: 'PriorDxAngioDateBeforeProcedureStartDT',
        message: 'Pior Diagnostic CAG Date should be before or equal to Procedure Start DateTime.'
      }
    ]
  },
  sectionE: {
    PrePCILVEF: [
      { type: 'min', message: 'LVEF must be at least 1%.' },
      { type: 'max', message: 'LVEF cannot be more than 99%.' }
    ],
    ProcSystolicBP: [
      { type: 'min', message: 'SBP must be at least 1 mmHg.' },
      { type: 'max', message: 'SBP cannot be more than 300 mmHg.' }
    ],
    FluoroTime: [
      { type: 'min', message: 'Fluoroscopy Time must be at least 0.1 min.' },
      { type: 'max', message: 'Fluoroscopy Time cannot be more than 300 min.' }
    ],
    ContrastVol: [
      { type: 'min', message: 'Contrast Volume Time must be at least 0 mL.' },
      { type: 'max', message: 'Contrast Volume Time cannot be more than 999 mL.' }
    ],
    FluoroDoseKerm: [
      { type: 'min', message: 'Value must be at least 1 mGy.' },
      { type: 'max', message: 'Value cannot be more than 50,000 mGy.' }
    ],
    FluoroDoseDAP: [
      { type: 'min', message: 'Value must be at least 1,000 mGy/cm2.' },
      { type: 'max', message: 'Value cannot be more than 5,000,000 mGy/cm2.' }
    ],
    ProcedureStartDateTime: [
      {
        type: 'ArrivalDTBeforeProcedureStartDT',
        message: 'Arrival DateTime should be before Procedure Start DateTime.'
      },
      {
        type: 'StressTestDateBeforeProcedureStartDT',
        message: 'Most Recent Stress Test Date should be before or equal to Procedure Start DateTime.'
      },
      {
        type: 'CardiacCTADateBeforeProcedureStartDT',
        message: 'Cardiac CTA Date should be before or equal to Procedure Start DateTime.'
      },
      {
        type: 'CalciumScoreDateBeforeProcedureStartDT',
        message: 'Agatston Calcium Score Date should be before or equal to Procedure Start DateTime.'
      },
      {
        type: 'PriorDxAngioDateBeforeProcedureStartDT',
        message: 'Pior Diagnostic CAG Date should be before or equal to Procedure Start DateTime.'
      },
      {
        type: 'ProcedureStartDTBeforeProcedureEndDT',
        message: 'Procedure Start DateTime should be before Procedure End DateTime.'
      },
      {
        type: 'ProcedureStartDTBeforeDCDateTime',
        message: 'Procedure Start DateTime should be before Discharge DateTime.'
      },
      {
        type: 'SymptomDTBefore7ProcedureStartDT',
        message: 'Symptom Date should be 1 week before or equal to Procedure Start DateTime.'
      }
    ],
    ProcedureEndDateTime: [
      {
        type: 'ProcedureStartDTBeforeProcedureEndDT',
        message: 'Procedure Start DateTime should be before Procedure End DateTime.'
      },
      {
        type: 'ProcedureEndDTBeforeDCDateTime',
        message: 'Procedure End DateTime should be before Discharge DateTime.'
      }
    ]
  },
  sectionF: {
    PreProcTnI: [
      { type: 'min', message: 'Trop-I must be at least 0.00 ng/mL.' },
      { type: 'max', message: 'Trop-I cannot be more than 5,000.00 ng/mL.' }
    ],
    PreProcTnT: [
      { type: 'min', message: 'Trop-T must be at least 0.00 ng/mL.' },
      { type: 'max', message: 'Trop-T cannot be more than 5,000.00 ng/mL.' }
    ],
    PreProcCreat: [
      { type: 'min', message: 'Creatinine must be at least 0.10 mg/dL.' },
      { type: 'max', message: 'Creatinine cannot be more than 30.00 mg/dL.' }
    ],
    HGB: [
      { type: 'min', message: 'Hemoglobin must be at least 1.00 g/dL.' },
      { type: 'max', message: 'Hemoglobin cannot be more than 50.00 g/dL.' }
    ],
    LipidsTC: [
      { type: 'min', message: 'Totol Cholesterol must be at least 0 mg/dL.' },
      { type: 'max', message: 'Totol Cholesterol cannot be more than 1,000 mg/dL.' }
    ],
    LipidsHDL: [
      { type: 'min', message: 'Totol Cholesterol must be at least 0 mg/dL.' },
      { type: 'max', message: 'Totol Cholesterol cannot be more than 300 mg/dL.' }
    ],
    PostProcTnI: [
      { type: 'min', message: 'Trop-I must be at least 0.00 ng/mL.' },
      { type: 'max', message: 'Trop-I cannot be more than 5,000.00 ng/mL.' }
    ],
    PostProcTnT: [
      { type: 'min', message: 'Trop-T must be at least 0.00 ng/mL.' },
      { type: 'max', message: 'Trop-T cannot be more than 5,000.00 ng/mL.' }
    ],
    PostProcCreat: [
      { type: 'min', message: 'Creatinine must be at least 0.10 mg/dL.' },
      { type: 'max', message: 'Creatinine cannot be more than 30.00 mg/dL.' }
    ],
    PostProcHgb: [
      { type: 'min', message: 'Hemoglobin must be at least 1.00 g/dL.' },
      { type: 'max', message: 'Hemoglobin cannot be more than 50.00 g/dL.' }
    ]
  },
  sectionG: {},
  sectionH: {},
  nativeLesion: {
    NVCoroVesselStenosis: [
      { type: 'min', message: 'Stenosis must be at least 0%.' },
      { type: 'max', message: 'Stenosis cannot be more than 100%.' }
    ],
    NV_FFR: [
      { type: 'min', message: 'FFR must be at least 0.00.' },
      { type: 'max', message: 'FFR cannot be more than 1.00.' }
    ],
    NV_IFR: [
      { type: 'min', message: 'IFR must be at least 0.0.' },
      { type: 'max', message: 'IFR cannot be more than 1.00.' }
    ],
    NV_IVUS: [
      { type: 'min', message: 'IVUS must be at least 0.00 mm2.' },
      { type: 'max', message: 'IVUS cannot be more than 10.00 mm2.' }
    ],
    NV_OCT: [
      { type: 'min', message: 'OCT must be at least 0.00 mm2.' },
      { type: 'max', message: 'OCT cannot be more than 10.00 mm2.' }
    ]
  },
  graftLesion: {
    GraftCoroVesselStenosis: [
      { type: 'min', message: 'Stenosis must be at least 0%.' },
      { type: 'max', message: 'Stenosis cannot be more than 100%.' }
    ],
    Graft_FFR: [
      { type: 'min', message: 'FFR must be at least 0.00.' },
      { type: 'max', message: 'FFR cannot be more than 1.00.' }
    ],
    Graft_IFR: [
      { type: 'min', message: 'IFR must be at least 0.0.' },
      { type: 'max', message: 'IFR cannot be more than 1.00.' }
    ],
    Graft_IVUS: [
      { type: 'min', message: 'IVUS must be at least 0.00 mm2.' },
      { type: 'max', message: 'IVUS cannot be more than 10.00 mm2.' }
    ],
    Graft_OCT: [
      { type: 'min', message: 'OCT must be at least 0.00 mm2.' },
      { type: 'max', message: 'OCT cannot be more than 10.00 mm2.' }
    ]
  },
  sectionI: {
    SymptomDateTime: [
      {
        type: 'SymptomDTBefore7ProcedureStartDT',
        message: 'Symptom Date should be 1 week before or equal to Procedure Start DateTime.'
      }
    ]
  },
  sectionJ: {},
  pciLesion: {
    StenosisPriorTreat: [
      { type: 'min', message: 'Stenosis must be at least 0%.' },
      { type: 'max', message: 'Stenosis cannot be more than 100%.' }
    ],
    LesionLength: [
      { type: 'min', message: 'Lesion Lenght must be at least 1 mm.' },
      { type: 'max', message: 'Lesion Lenght cannot be more than 100 mm.' }
    ],
    StenosisPostProc: [
      { type: 'min', message: 'Stenosis must be at least 0%.' },
      { type: 'max', message: 'Stenosis cannot be more than 100%.' }
    ]
  },
  pciDevice: {
    DeviceDiameter: [
      { type: 'min', message: 'Device Diatmeter must be at least 0.01 mm.' },
      { type: 'max', message: 'Degice Diatmeter cannot be more than 10.00 mm.' }
    ],
    DeviceLength: [
      { type: 'min', message: 'Device Length must be at least 1 mm.' },
      { type: 'max', message: 'Device Length cannot be more than 100 mm.' }
    ]
  },
  sectionK: {
    PRBCUnits: [
      { type: 'min', message: 'PRBC must be at least 0 unit.' },
      { type: 'max', message: 'PRBC cannot be more than 100 unit.' }
    ]
  },
  sectionL: {
    DCCreatinine: [
      { type: 'min', message: 'Creatinine must be at least 0.10 mg/dL.' },
      { type: 'max', message: 'Creatinine cannot be more than 30.00 mg/dL.' }
    ],
    DCHgb: [
      { type: 'min', message: 'Hemoglobin Length must be at least 1.00 g/dL.' },
      { type: 'max', message: 'Hemoglobin Length cannot be more than 50.00 g/dL.' }
    ],
    DCDateTime: [
      { type: 'ArrivalDTBeforeDischargeDT', message: 'Arrival DateTime should be before Discharge DateTime.' },
      {
        type: 'ProcedureStartDTBeforeDCDateTime',
        message: 'Procedure Start DateTime should be before Discharge DateTime.'
      },
      {
        type: 'ProcedureEndDTBeforeDCDateTime',
        message: 'Procedure End DateTime should be before Discharge DateTime.'
      }
    ]
  },
  sectionM: {}
};
