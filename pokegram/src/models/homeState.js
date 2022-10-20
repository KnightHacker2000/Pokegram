class HomeState {
  UID;

  handleHomeStates;

  isAct;

  isPosts;

  isProf;

  isUp;

  myUID;

  constructor(UID, handleHomeStates, isAct, isPosts, isProf, isUp, myUID) {
    this.UID = UID;
    this.handleHomeStates = handleHomeStates;
    this.isAct = isAct;
    this.isPosts = isPosts;
    this.isProf = isProf;
    this.isUp = isUp;
    this.myUID = myUID;
  }
}
export default HomeState;
