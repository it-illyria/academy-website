import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// GET all cohorts
export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) return unauthorizedResponse();

  const client = getServiceClient();
  if (!client) return NextResponse.json({ items: [], source: "none" });

  const { data, error } = await client
    .from("cohorts")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data || [] });
}

// POST — create new cohort
export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) return unauthorizedResponse();

  const client = getServiceClient();
  if (!client) return NextResponse.json({ error: "No database" }, { status: 500 });

  const body = await request.json();
  const { data, error } = await client.from("cohorts").insert(body).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

// PUT — update cohort
export async function PUT(request: NextRequest) {
  if (!verifyAdminRequest(request)) return unauthorizedResponse();

  const client = getServiceClient();
  if (!client) return NextResponse.json({ error: "No database" }, { status: 500 });

  const { id, ...updates } = await request.json();
  updates.updated_at = new Date().toISOString();

  const { data, error } = await client.from("cohorts").update(updates).eq("id", id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

// DELETE — delete cohort
export async function DELETE(request: NextRequest) {
  if (!verifyAdminRequest(request)) return unauthorizedResponse();

  const client = getServiceClient();
  if (!client) return NextResponse.json({ error: "No database" }, { status: 500 });

  const { id } = await request.json();
  const { error } = await client.from("cohorts").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
