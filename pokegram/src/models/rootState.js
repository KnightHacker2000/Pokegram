class RootState {
  isLogin;

  isReg;

  myUID;

  handleSetStates;

  constructor(isLogin, isReg, myUID, handleSetStates) {
    this.isLogin = isLogin;
    this.isReg = isReg;
    this.myUID = myUID;
    this.handleSetStates = handleSetStates;
  }
}
export default RootState;
