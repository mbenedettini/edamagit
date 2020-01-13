import { MagitChangeHunk } from '../models/magitChangeHunk';
import { FinalLineBreakRegex } from '../common/constants';
import { Uri } from 'vscode';

export default class GitTextUtils {

  public static diffToHunks(diff: string, uri: Uri): MagitChangeHunk[] {

    const hunksStart = diff.indexOf('@@');
    const diffHeader = diff.slice(0, hunksStart);

    return diff
      .replace(FinalLineBreakRegex, '') // removes extra line break at the end
      .slice(hunksStart)
      .split(/\n(?=^@@.*@@.*$)/gm)
      .map(hunkText => ({ diff: hunkText, diffHeader, uri }));
  }
}