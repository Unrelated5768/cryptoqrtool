{
  description = "Bun-first Svelte 5 application development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              bun
              git
              nodejs_22
              prettier
              typescript
              typescript-language-server
            ];

            SVELTEKIT_TELEMETRY_DISABLED = "1";

            shellHook = ''
              export BUN_INSTALL="$PWD/.bun"
              export PATH="$BUN_INSTALL/bin:$PATH"

              echo "Bun $(bun --version) | Node $(node --version)"
              echo "Create app: bun create svelte@latest ."
              echo "Install deps: bun install"
              echo "Run dev:    bun run dev -- --host 0.0.0.0"
            '';
          };
        }
      );

      formatter = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        pkgs.nixfmt-rfc-style
      );
    };
}
