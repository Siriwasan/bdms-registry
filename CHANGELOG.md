# 1.8.1 (2020-01-27)

### Features

- **ACSx290:** split bar chart by year

# 1.8.0 (2020-01-26)

### Features

- **UI:** improve UI loader

# 1.7.0 (2020-01-25)

### Features

- **ACSx290:** add ACSx290 bar chart
- **CathPci50:** add CathPci50 bar chart

# 1.6.2 (2020-01-20)

### Features

- **Registry:** specify export list to selected hospital

# 1.6.1 (2020-01-19)

### Bug Fixes

- **CathPci50:** export with intra-coronary device list

# 1.6.0 (2020-01-18)

### Features

- **CathPci50:** show detail in Pci and Device tab

# 1.5.2 (2020-01-11)

### Bug Fixes

- **CathPci50:** check and warning for duplicate AN

# 1.5.1 (2019-12-24)

### Features

- **Registry:** search from database random Id

# 1.5.0 (2019-12-19)

### Features

- **Registry:** remove running Id, change to random Id
- **Registry form:** add procedure datetime, created datetime

# 1.4.2 (2019-12-16)

### Features

- **Staff form:** add Medical License Number/Staff Id attribute

# 1.4.1 (2019-12-15)

### Features

- **CathPci50:** change report logo
- **CathPci50:** add multiple fields to form and update export xlsx

### Bug Fixes

- **Staff form:** fixed bug in update staff profile

# 1.4.0 (2019-12-12)

### Features

- **CathPci50:** add all BDMS hospitals
- **CathPci50:** printable registry form

# 1.3.2 (2019-11-27)

### Bug Fixes

- **Staff form:** fixed bug in clear staff profile form

# 1.3.1 (2019-11-12)

### Features

- **Registry list:** implement filter by hospital

# 1.3.0 (2019-11-10)

### Features

- **Registry form:** implement group in dropdown, set to default/null button
- **Registry list:** implement registry list control
- **CathPci50:** add DateTime validation, add data dictionary
- **UI:** improve form layout

# 1.2.0 (2019-10-03)

### Bug Fixes

- **Database:** fixed load database bugs

### Features

- **UI:** add RegSelectSearh component

# 1.1.0 (2019-10-02)

### Bug Fixes

- **Registry form:** fixed submit nagivation bug

### Features

- **UI:** click registry tag to apply filter
- **Tools:** rebuild registry tags

# 1.0.0 (2019-10-01)

### Features

- **Registry:** add NCDR CathPCI v5.0 registry
- **Authentication:** enable secondary hospital, improve authorization to support multi-registry
- **UI:** rename Registry menu to STS, add tags to registries for summarization, improve table list columns appearance

# 0.8.0 (2019-08-23)

### Bug Fixes

- **Registry form:** fixed form completion calcuation bug

### Performance Improvements

- **Registry form:** decrease form loading time 50%

# 0.7.1 (2019-08-19)

### Features

- **Registry:** enable for multi-site
- **Authentication:** filter by role and permission

### Bug Fixes

- **UI:** dropdown can deselect choosen option
- **Database:** add hospital id to Registry model

# 0.7.0 (2019-08-17)

### Features

- **Authentication:** enable user login and role
- **My Patients:** filter result for staff attended case
- **Tools:** add export/import functions for backup database
- **UI:** improve round progress bar visual effect

### Bug Fixes

- **Database:** migrate staffId to running number

# 0.6.3 (2019-08-01)

### Features

- **UI:** added round progress bar to registry form

# 0.6.2 (2019-07-30)

### Features

- **UI:** added fab speed dial to registry form

# 0.6.1 (2019-07-23)

### Features

- **UI:** added loading indicator for Registry form

# 0.6.0 (2019-07-22)

### Features

- **App:** first published. Limitation for ACSx290 form input and staff management
