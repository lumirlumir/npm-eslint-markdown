use markdown::{ParseOptions, to_mdast};
use napi::{Error, Result};
use napi_derive::napi;

#[napi]
pub fn from_markdown(source: String) -> Result<String> {
    let tree = to_mdast(&source, &ParseOptions::gfm())
        .map_err(|error| Error::from_reason(error.to_string()))?;

    // Do not use `to_string_pretty` here for performance reasons.
    serde_json::to_string(&tree).map_err(|error| Error::from_reason(error.to_string()))
}
