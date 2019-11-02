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

        $query = [
            'limit' => 50,
            'term' => $request->keyword . ' restaurants',
            'open_now' => true,
            'price' => $request->price,
            'radius' => $request->radius
        ];

        if ($request->latitude != '' and $request->longitude != '') {
            $query['latitude'] = $request->latitude;
            $query['longitude'] = $request->longitude;
        } elseif ($request->location != '') {
            $query['location'] = $request->location;
        }

        $res = $client->request('GET', 'https://api.yelp.com/v3/businesses/search', [
            'headers' => [
                'Authorization' => 'Bearer ' . env('YELP_API_KEY'),
                'Accept'        => 'application/json',
            ],
            'query' => $query
        ]);

        return $res->getBody();
    }
}
