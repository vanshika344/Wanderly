import { supabase } from "../supabaseClient"

export async function uploadPhoto(file, userId) {
  const { data, error } = await supabase.storage
    .from("entry-photos")
    .upload(`${userId}/${Date.now()}_${file.name}`, file)

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from("entry-photos")
    .getPublicUrl(data.path)

  return urlData.publicUrl
}
