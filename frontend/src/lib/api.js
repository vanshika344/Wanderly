import axios from "axios"
import { supabase } from "../supabaseClient"

async function getToken() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token
}

function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
}

export async function createCollection(formData) {
  const token = await getToken()
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/collections`,
    {
      photo_urls: formData.photoUrls,
      format: formData.format,
      reference_index: formData.referenceIndex,
      raw_content: formData.storyNotes,
      color_theme: formData.colorTheme,
      place: formData.place,
      trip_date: formData.tripDate,
      companions: formData.companions,
    },
    authHeaders(token),
  )
  return res.data
}

export async function getMyCollections() {
  const token = await getToken()
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/collections`,
    authHeaders(token),
  )
  return res.data
}

export async function getCollection(id) {
  const token = await getToken()
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/collections/${id}`,
    authHeaders(token),
  )
  return res.data
}
