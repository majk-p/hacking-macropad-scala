{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-parts = { url = "github:hercules-ci/flake-parts"; };
  };

  outputs = inputs@{ nixpkgs, flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "x86_64-darwin" "aarch64-darwin" ];
      perSystem = { system, config, pkgs, ... }: {
        devShells.default = pkgs.mkShell { packages = with pkgs; [ nodejs ]; };
      };
    };
}

