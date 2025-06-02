import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type GAME = 'tango' | 'queens' | 'zip';

async function GET(request: Request) {

    const {data, error} = await supabase.from('result').select()

    return new Response(JSON.stringify(data));
}

export function POST(request: Request) {
    return new Response('Hello From the Serverless Function');
}