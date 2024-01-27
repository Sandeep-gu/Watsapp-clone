import { createContext, useState } from "react";

export const AcountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [person, setPerson] = useState();
  return (
    <AcountContext.Provider value={{ account, setAccount, person, setPerson }}>
      {children}
    </AcountContext.Provider>
  );
};

export default AccountProvider;
