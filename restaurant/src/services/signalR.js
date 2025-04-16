import * as signalR from '@microsoft/signalr';
import axiosClient from '../api/axiosClient';

const HUB_ENDPOINT = "menuCategoryHub";

let hubConnection = null;

export const initHubConnection = async () => {
  if (!hubConnection) {
    hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${axiosClient.defaults.baseURL.replace('/api', '')}/${HUB_ENDPOINT}`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    try {
      await hubConnection.start();
      console.log('SignalR Connected!');
    } catch (err) {
      console.error('SignalR Connection Error:', err);
    }
  }
  return hubConnection;
};

export const setupMenuHubListeners = (callbacks) => {
  initHubConnection().then(connection => {
    connection.on("ReceiveCategoryUpdate", callbacks.onCategoryUpdated);
    connection.on("ReceiveMenuUpdate", callbacks.onMenuUpdated);
  });
};

export const removeMenuHubListeners = () => {
  if (hubConnection) {
    hubConnection.off("ReceiveCategoryUpdate");
    hubConnection.off("ReceiveMenuUpdate");
  }
};