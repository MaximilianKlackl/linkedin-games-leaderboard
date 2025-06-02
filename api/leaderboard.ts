import { createClient } from '@supabase/supabase-js';

type GAME = 'tango' | 'queens' | 'zip';

async function GET(request: Request) {

    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );

    const {data, error} = await supabase.from('result').select()

    return new Response(JSON.stringify(data));
}

export function POST(request: Request) {
    return new Response('Hello From the Serverless Function');
}