import supabase from "./utils/supabase";
import createClient from "./utils/supabase";

type GAME = 'tango' | 'queens' | 'zip';

async function GET(request: Request) {

    const {data, error} = await supabase.from('result').select()

    return new Response(JSON.stringify(data));
}

export function POST(request: Request) {
    return new Response('Hello From the Serverless Function');
}