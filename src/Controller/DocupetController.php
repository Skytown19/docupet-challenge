<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;

class DocupetController extends AbstractController
{
    #[Route('/home')]
    public function home(): Response
    {
        return new Response(
            '<html><body>HOME</body></html>'
        );
    }
}
