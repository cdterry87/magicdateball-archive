<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function search(Request $request)
    {
        $client = new Client();

        $res = $client->request('GET', 'https://api.yelp.com/v3/businesses/search', [
            'headers' => [
                'Authorization' => 'Bearer ' . env('YELP_API_KEY'),
                'Accept'        => 'application/json',
            ],
            'query' => [
                'limit' => 50,
                'term' => $request->keyword . ' restaurants',
                'open_now' => true,
                'location' => $request->zip,
                'price' => $request->price,
                'radius' => $request->radius
            ]
        ]);

        return $res->getBody();
    }
}
