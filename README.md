# BDMS Registry

<https://github.com/Siriwasan/bdms-registry>
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## 1. Setup Firebase

```node
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## 2. Setup Angular Material

<https://material.angular.io/guide/getting-started>

## 3. Setup Angular Flex Layout

<https://github.com/angular/flex-layout#angular-flex-layout>

## 4. Setup AngularFire

<https://github.com/angular/angularfire2>

## Registry List

| Id        | Abbreviate | Registry                       | Published          |
|-----------|------------|--------------------------------|--------------------|
| ACSx290   | ACX        | STS Adult Cardiac Surgery v2.9 | February 13, 2017  |
| CathPci50 | PCI        | NCDR CathPCI Registry v5.0     | September 18, 2018 |

## Position

| abbreviation | position                  |
|--------------|---------------------------|
| CS           | Cardiac Surgeon           |
| AN           | Anesthesiologist          |
| SN           | Scrub Nurse               |
| CT           | Cardiothoracic technician |
| HC           | Heart Coordinator         |
| RS           | Researcher                |
| RG           | Register                  |

## Hospital

| hospId | name                   |
|--------|------------------------|
| BHT    | Bangkok Heart Hospital |
| BCM    | Bangkok Bangkok Chiang Mai Hospital |

## Role

| role          |
|---------------|
| Director      |
| Administrator |
| Editor        |
| Viewer        |
| Staff         |

## Permission

| permission |
|------------|
| Hospital   |
| Group      |
| BDMS       |

## Menu

| menu        | authenticate | role                            |
|-------------|--------------|---------------------------------|
| Home        | N            | -                               |
| Registry    | Y            | Director, Administrator, Editor |
| My Patients | Y            | Director, Administrator, Staff  |
| Staff       | Y            | Director, Administrator         |
| Tools       | Y            | Director                        |
| About       | N            | -                               |
