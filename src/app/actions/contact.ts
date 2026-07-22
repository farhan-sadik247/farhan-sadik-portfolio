'use server';

export async function sendEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  
  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not defined in environment variables");
    return { success: false, message: "Server configuration error." };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Web3Forms API Error Status:", response.status, result);
    }
    return result;
  } catch (error) {
    console.error("Server Action Exception Caught:", error);
    return { success: false, message: "Exception during fetch." };
  }
}
