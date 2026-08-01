## Description

- [Ticket Link](#) (if any)
- Provide a small description ( 2 - 3 lines) of the Pull Request

## UI screenshot or Video

- Please include a screenshot or video to help reviewers understand the specific part of the application being modified. Multiple screenshots are appreciated

---

## Checklist - All needs to be ticked before sending PR for review:

### General:

- [ ] **PR Size :** Confirming PR size < 20 files or pre-approved if > 20 files.

### Client:

- [ ] **Console :** Confirming no console errors in the UI for this update.

- [ ] **Import order :** Confirming correct import order.

```
# External Import
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

# Internal Import
import { } from '../../Api/ApiRoutes';
import { } from '../../constants/AppConstant';
```

- [ ] **Re-renders :** Confirming minimal re-renders for new React components.

- [ ] **Network calls :** Confirming efficient network/API calls, minimized as needed.

- [ ] **Util function comments :** Confirming comprehensive comments for utility functions.

- [ ] **Image optimization :** Confirming I have checked that all images are optimized. If not, please use https://tinyjpg.com/ or https://vecta.io/nano.

- [ ] **Dead code :** Confirming I have removed all comments code which is of no use OR written why I have kept the commented code.

### Confirming different viewport testing of the entire flow:

- [ ] Tested on 280px viewport
- [ ] Tested on 320px viewport
- [ ] Tested on 375px viewport
- [ ] Tested on 425px viewport
- [ ] Tested on 768px viewport
- [ ] Tested on 1024px viewport
- [ ] Tested on 1440px viewport
- [ ] Tested on 2560px viewport

### End-to-end testing:

- [ ] **Happy flow :** Successfully tested end-to-end happy flow, all working as expected.
- [ ] **Error flow :** Tested UI flow with error scenarios, gracefully handled errors on UI
- [ ] **Common component changed :** Tested change in common component across views to prevent breaking elsewhere.
