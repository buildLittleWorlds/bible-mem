import type { APIContext } from 'astro';
import { supabase } from '../../lib/supabase';

export async function POST({ request }: APIContext) {
  try {
    const formData = await request.formData();
    const hex_code = formData.get('hex_code') as string;
    const painting = formData.get('painting') as string;
    const artist = formData.get('artist') as string;
    const painting_url = formData.get('painting_url') as string;
    const locus_description = formData.get('locus_description') as string;
    const half_verse_text = formData.get('half_verse_text') as string;

    // Validate hex_code
    if (!/^[0-9A-Fa-f]{4}$/.test(hex_code)) {
      return new Response(JSON.stringify({ error: 'Invalid hex code format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Additional validations can be added here

    const { data, error } = await supabase
      .from('bible_master')
      .update({ painting, artist, painting_url, locus_description, half_verse_text })
      .eq('hex_code', hex_code);

    if (error) {
      console.error('Supabase error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (data === null) {
      return new Response(JSON.stringify({ error: 'No matching record found for the given hex code' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'Data updated successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}