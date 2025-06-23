import authService from './api/auth-service';

export { useAuth } from './hooks/use-auth';
export { isDoctor, isPatient } from './utils';
export { authService };

export { SignedIn } from './components/view-controllers/signed-in';
export { SignedOut } from './components/view-controllers/signed-out';
export { ViewOnlyTo } from './components/view-controllers/view-only-to';
export { ViewToCurrentUser } from './components/view-controllers/view-to-current-user';
export { ViewToOthersOnly } from './components/view-controllers/view-to-others-only';
