import React from 'react'
import {Link, Page, Stack} from "@shopify/polaris";
export const Footer = ({children}) => {
  return (
    <footer className="footer-wrapper_outer">
      <div className="footer-wrapper_inner">
        <Page fullWidth>
          <Stack distribution="center">
          <p>Learn more about {""}
            <Link url="https://github.com/cyberwalley/shoppies-2021" external>Shoppies</Link>
          </p>
          </Stack>
        </Page>
      </div>
    </footer>
  )
}
