import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";

// Use service role for admin operations
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// GET — fetch all submissions (with optional type filter)
export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) return unauthorizedResponse();

  const client = getServiceClient();
  if (!client) {
    return NextResponse.json({ submissions: [], source: "none" });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let query = client
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (type && type !== "all") {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ submissions: data || [], source: "supabase" });
}

// PATCH — update submission status
export async function PATCH(request: NextRequest) {
  if (!verifyAdminRequest(request)) return unauthorizedResponse();

  const client = getServiceClient();
  if (!client) {
    return NextResponse.json({ error: "No database configured" }, { status: 500 });
  }

  const { id, status } = await request.json();

  const { error } = await client
    .from("submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// DELETE — delete a submission
export async function DELETE(request: NextRequest) {
  if (!verifyAdminRequest(request)) return unauthorizedResponse();

  const client = getServiceClient();
  if (!client) {
    return NextResponse.json({ error: "No database configured" }, { status: 500 });
  }

  const { id } = await request.json();

  const { error } = await client
    .from("submissions")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
