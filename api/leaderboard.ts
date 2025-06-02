import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

type GAME = 'tango' | 'queens' | 'zip';

async function GET(request: Request) {

    const {data, error} = await supabaseClient.from('result').select()

    return new Response(JSON.stringify(data));
}

export function POST(request: Request) {
    return new Response('Hello From the Serverless Function');
}