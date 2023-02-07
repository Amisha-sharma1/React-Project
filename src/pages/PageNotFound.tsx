import React from 'react';
import { Box} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <Box className="page_404">
		<Box className="page-not-found-img">
			<h1 className="text-center">404</h1>
		</Box>
		<Box className='text-center'>
		<Link to="/" className="home-button">
			Back To Home
        </Link>
		</Box>
		</Box>
  )
}


