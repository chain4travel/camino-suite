import store from "wallet/store";

export async function updateCamAsset() {
  try {
    await store.dispatch("Assets/updateAvaAsset");
  } catch (e) {
    console.log(e.message);
  }
}

export async function uplatformUpdate() {
  try {
    await store.dispatch("Platform/update");
  } catch (e) {
    console.log(e.message);
  }
}
export async function updateUTXOs() {
  try {
    await store.dispatch("Assets/updateUTXOs");
  } catch (e) {
    console.log(e.message);
  }
}
export async function updateKycStatus() {
  try {
    await store.dispatch("Accounts/updateKycStatus");
  } catch (e) {
    console.log(e.message);
  }
}

export async function logoutFromWallet() {
  try {
    await store.dispatch("logout");
  } catch (e) {
    console.log(e.message);
  }
}

export async function updateAssets() {
  await updateCamAsset();
  await uplatformUpdate();
  await updateUTXOs();
  await updateKycStatus();
}
