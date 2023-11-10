import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import useWebSocket from "react-use-websocket";

const WebsocketCommunicationContext = createContext({});

const WebsocketCommunicationProvider = ({ children }) => {
  const [waitingForTag, setWaitingForTag] = useState(false);
  const [tagNumber, setTagNumber] = useState("");
  const [productState, setProductState] = useState("");

  const host = "localhost";
  const port = "5443";
  const { lastMessage, sendMessage } = useWebSocket(`ws://${host}:${port}`, {
    onOpen: () => console.log(`Connected to App WS`),
    // onMessage: () => {
    //   if (lastMessage) {
    //     const { data } = lastMessage;
    //     if (data.includes("Providing product")) {
    //       setProductState("providing");
    //     } else if (data.includes("Product provided")) {
    //       setProductState("success");
    //     } else if (data.includes("Error Providing product")) {
    //       setProductState("error");
    //       console.log(data);
    //     } else if (data.includes("tagNumber")) {
    //       const nfcTagNumber = data.split("tagNumber ")[1];
    //       if (waitingForTag) setTagNumber(nfcTagNumber);
    //     } else {
    //       console.log("Unexpected data received");
    //     }
    //   }
    // },
    onError: (event) => {
      console.error(event);
    },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastMessage) {
      const { data } = lastMessage;
      if (data.includes("Providing product")) {
        setProductState("providing");
      } else if (data.includes("Product provided")) {
        setProductState("success");
      } else if (data.includes("Error Providing product")) {
        setProductState("error");
        console.log(data);
      } else if (data.includes("tagNumber")) {
        const nfcTagNumber = data.split("tagNumber ")[1];
        if (waitingForTag) setTagNumber(nfcTagNumber);
      } else {
        console.log(`Unexpected data received ${data}`);
      }
    }
  }, [lastMessage, setProductState, waitingForTag]);

  useEffect(() => {
    if (waitingForTag) {
      setTagNumber("");
    }
  }, [waitingForTag]);

  const requestProduct = useCallback(
    (productId) => {
      console.log(`pid ${productId}`);
      sendMessage(`Provide ${productId}`);
      setProductState("requested");
    },
    [sendMessage, setProductState]
  );

  return (
    <WebsocketCommunicationContext.Provider
      value={{
        tagNumber,
        productState,
        waitingForTag,
        setTagNumber,
        setProductState,
        setWaitingForTag,
        requestProduct,
      }}
    >
      {children}
    </WebsocketCommunicationContext.Provider>
  );
};

const useWebsocketCommunication = () => {
  const context = useContext(WebsocketCommunicationContext);

  if (!context) {
    throw new Error(
      "useWebsocketCommunication must be used within an WebsocketCommunicationProvider"
    );
  }

  return context;
};

export { WebsocketCommunicationProvider, useWebsocketCommunication };
